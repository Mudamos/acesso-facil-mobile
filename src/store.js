import { accountEpics, configEpics } from "./epics";
import { applyMiddleware, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import Config from "react-native-config";
import accountManager from "./services/account";
import api from "./services/api";
import configManager from "./services/config";
import { createLogger } from "redux-logger";
import { defaultStorage } from "./services/storage";
import { isDev } from "./utils";
import reducer from "./reducers";

export const storeBuilder = () => {
  const logger = createLogger({
    collapsed: true,
    timestamp: true,
    colors: {
      title: false,
      prevState: false,
      action: false,
      nextState: false,
      error: false,
    },
    diff: true,
    level: {
      prevState: false,
      action: "log",
      nextState: "log",
      error: "error",
    },
  });

  const epics = [accountEpics, configEpics];

  const rootEpic = combineEpics(...epics);

  const storage = defaultStorage();

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      api: api(Config),
      accountManager: accountManager({
        keychainNamespace: Config.KEYCHAIN_NAMESPACE,
        storage,
      }),
      configManager: configManager({
        storage,
      }),
    },
  });

  const store = isDev
    ? createStore(reducer, applyMiddleware(epicMiddleware, logger))
    : createStore(reducer, applyMiddleware(epicMiddleware));

  return {
    store,
    run() {
      epicMiddleware.run(rootEpic);
    },
  };
};
