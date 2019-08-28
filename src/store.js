import { applyMiddleware, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { ajax } from "rxjs/ajax";
import { createAccount } from "./epics";
import { createLogger } from "redux-logger";
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

  const epics = [createAccount];

  const rootEpic = combineEpics(...epics);
  const epicMiddleware = createEpicMiddleware({
    dependencies: { getJSON: ajax.getJSON },
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
