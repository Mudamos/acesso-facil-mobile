import { curry, pickAll } from "ramda";
import farfetch, { prefix, requestLogger, responseLogger } from "farfetch";
import { isDev, log } from "../utils";

import { camelizeKeys } from "humps";

const handleResponseError = res =>
  res.then(rejectErrorResponses).catch(logError);

const rejectErrorResponses = res => {
  log("Api response:", res);

  return deserialize(res)
    .catch(() => ({}))
    .then(json => ({
      response: res,
      json: camelizeKeys(json),
    }));
};

const deserialize = res => res.json().then(camelizeKeys);

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
  log("Raw error: ", err.message, err.stack, err.json);
  return Promise.reject(err);
};

const serializeJson = req => ({ ...req, body: JSON.stringify(req.body) });

const getData = ({ json }) => json;

const createAccount = curry((client, { content, publicKey, signature }) =>
  client
    .use(serializeJson)
    .post("/keys")
    .send({ content, publicKey, signature })
    .then(getData),
);

const login = curry((client, { content, signature }) =>
  client
    .use(serializeJson)
    .post("/login")
    .send({ content, signature })
    .then(getData),
);

export default Config => {
  const client = requester({ host: Config.API_URL });

  return {
    createAccount: createAccount(client),
    login: login(client),
  };
};
