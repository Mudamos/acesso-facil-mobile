import { curry, includes, isEmpty, lensProp, omit, pickAll, propOr, set } from "ramda";
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

    if (/4\d\d/.test(res.status) || !res.ok) {
      return Promise.reject(
        set(
          lensProp("data"),
          propOr("Sem resposta do servidor, tente novamente mais tarde", "descricao", body),
          customResponse,
        ),
      );
    }

    return res.ok ? Promise.resolve(customResponse) : Promise.reject(customResponse);
  });
};

const deserialize = (res, expectJson) => {
  const contentType = res.headers.get("content-type");

  return res.text().then(body => {
    if (expectJson && contentType && includes("application/json", contentType)) {
      if (isEmpty(body)) {
        return null;
      }

      return camelizeKeys(JSON.parse(body));
    }

    return body;
  });
};

const requester = ({ host, expectJson, storage }) => {
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
      execute: async req => {
        const requestedAt = new Date().toUTCString();
        const request = pickAll(["body", "headers", "url"], req);

        log(request);
        try {
          const response = await handleResponseError(execute(req), expectJson);
          const responseArrivedAt = new Date().toUTCString();

          await logAtStore(
            storage,
            {
              requestedAt,
              request,
              response: omit(["response"], response),
              responseArrivedAt
            }
          );

          return Promise.resolve(response) ;
        } catch (e) {
          const responseArrivedAt = new Date().toUTCString();

          await logAtStore(
            storage,
            {
              requestedAt,
              request,
              response: omit(["response"], e),
              responseArrivedAt
            }
          );

          return Promise.reject(getData(e) || e.message);
        }
      },
    }));

  return builder;
};

const logError = err => {
  log("Raw error: ", err.message, err.status, err.data, err.response);
  return Promise.reject(err);
};

const logAtStore = (storage, log) => {
  const key = "request-logs";

  storage.fetch(key)
    .then(logs => {
      const previous = logs ? JSON.parse(logs) : [];

      return storage.store(key, JSON.stringify([log, ...previous]))
    })
}

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

export default ({ config, storage }) => {
  const clientText = requester({ host: config.API_URL, storage, expectJson: false });
  const clientJson = requester({ host: config.API_URL, storage, expectJson: true });

  return {
    createAccount: createAccount(clientJson),
    fetchPublicKey: fetchPublicKey(clientText),
    fetchQrcodeSignedData: fetchQrcodeSignedData(clientText),
    login: login(clientJson),
  };
};
