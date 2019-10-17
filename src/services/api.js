import { curry, includes, isEmpty, lensProp, pickAll, propOr, set } from "ramda";
import farfetch, { prefix, requestLogger, responseLogger } from "farfetch";
import { isDev, log } from "../utils";

import { camelizeKeys } from "humps";

const handleResponseError = res =>
  res.then(rejectErrorResponses).catch(logError);

const rejectErrorResponses = res => {
  log("Api response:", res);

  return deserialize(res).then(json => {
    const body = {
      status: res.status,
      response: res,
      data: camelizeKeys(json),
    };

    log("Api response body: ", json);

    if (/4\d\d/.test(res.status)) {
      return Promise.reject(
        set(
          lensProp("data"),
          propOr("Identidade expirada, por favor gere uma nova", "descricao", json),
          body,
        ),
      );
    }

    return res.ok ? Promise.resolve(body) : Promise.reject(body);
  });
};

const deserialize = res => {
  const contentType = res.headers.get("content-type");

  return res.text().then(body => {
    if (contentType && includes("application/json", contentType)) {
      if (isEmpty(body)) {
        return null;
      }

      return camelizeKeys(JSON.parse(body));
    }

    return body;
  });
};

const requester = ({ host }) => {
  let builder = farfetch;

  if (isDev) {
    builder = builder.use(requestLogger()).use(responseLogger());
  }

  builder = builder
    .use(prefix(host))
    .use(req => req.set("Content-Type", "application/json"))
    .use(req => req.set("Accept", "application/json"))
    .use((req, execute) => ({
      ...req,
      execute: req => {
        log(pickAll(["body", "headers", "url"], req));
        return handleResponseError(execute(req));
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
    .use(serializeJson)
    .post("/keys")
    .send({ content, publicKey, signature })
    .then(getData),
);

const login = curry((client, { content, signature, publicKey }) =>
  client
    .use(serializeJson)
    .post("/sign_in")
    .send({ content, signature, publicKey })
    .then(getData),
);

const fetchPublicKey = client => () => client.get("/public-key").then(getData);

export default Config => {
  const client = requester({ host: Config.API_URL });

  return {
    createAccount: createAccount(client),
    login: login(client),
    fetchPublicKey: fetchPublicKey(client),
  };
};
