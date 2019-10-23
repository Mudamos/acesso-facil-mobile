import { curry, includes, isEmpty, lensProp, pickAll, propOr, set } from "ramda";
import farfetch, { prefix, requestLogger, responseLogger } from "farfetch";
import { isDev, log } from "../utils";

import { camelizeKeys } from "humps";

const handleResponseError = (res, expectJson) =>
  res.then(error => rejectErrorResponses(error, expectJson)).catch(logError);

const rejectErrorResponses = (res, expectJson) => {
  log("Api response:", res);

  return deserialize(res, expectJson).then(body => {
    const customResponse = {
      status: res.status,
      response: res,
      data: expectJson ? camelizeKeys(body) : body,
    };

    log("Api response body: ", body);

    if (/4\d\d/.test(res.status)) {
      return Promise.reject(
        set(
          lensProp("data"),
          propOr("Identidade expirada, por favor gere uma nova", "descricao", body),
          customResponse,
        ),
      );
    }

    return res.ok ? Promise.resolve(customResponse) : Promise.reject(customResponse);
  });
};

const deserialize = (res, expectJson) => {
  const contentType = res.headers.get("content-type");

  if (expectJson) {
    return res.json().then(camelizeKeys);
  }

  return res.text();
};

const requester = ({ host, expectJson }) => {
  let builder = farfetch;

  if (isDev) {
    builder = builder.use(requestLogger()).use(responseLogger());
  }

  if (expectJson) {
    builder = builder.use(serializeJson);
  }

  builder = builder
    .use(prefix(host))
    .use(req => req.set("Content-Type", "application/json"))
    .use(req => req.set("Accept", expectJson ? "application/json" : "text/plain"))
    .use((req, execute) => ({
      ...req,
      execute: req => {
        log(pickAll(["body", "headers", "url"], req));
        return handleResponseError(execute(req), expectJson);
      },
    }));

  return builder;
};

const logError = err => {
  log("Raw error: ", err.message, err.status, err.data, err.response);
  return Promise.reject(getData(err) || err.message);
};

const serializeJson = req => ({ ...req, body: JSON.stringify(req.body) });

const getData = ({ data }) => data;

const createAccount = curry((client, { content, publicKey, signature }) =>
  client
    .post("/keys")
    .send({ content, publicKey, signature })
    .then(getData),
);

const login = curry((client, { content, signature, publicKey }) =>
  client
    .post("/sign_in")
    .send({ content, signature, publicKey })
    .then(getData),
);

const fetchPublicKey = client => () => client.get("/public-key").then(getData);

const fetchQrcodeSignedData = client => hash => client.get(`/qrcode/${hash}`).then(getData);

export default Config => {
  const clientText = requester({ host: Config.API_URL, expectJson: false });
  const clientJson = requester({ host: Config.API_URL, expectJson: true });

  return {
    createAccount: createAccount(clientJson),
    fetchPublicKey: fetchPublicKey(clientText),
    fetchQrcodeSignedData: fetchQrcodeSignedData(clientText),
    login: login(clientJson),
  };
};
