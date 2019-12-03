import { fetchLogsError, fetchLogs as fetchLogsRequest, fetchLogsSucess } from "../actions";

import { combineEpics } from "redux-observable";
import {
  exhaustMap as exhaustMap$,
} from "rxjs/operators";
import { of } from "rxjs";
import { ofType as ofType$ } from "redux-observable";

const mountAppEpic = action$ =>
  action$.pipe(
    ofType$("APP_DID_MOUNT"),
    exhaustMap$(() =>
      Promise.resolve()
        .then(fetchLogsRequest),
    ),
  );

const fetchLogs = (action$, state$, { storage }) =>
  action$.pipe(
    ofType$("FETCH_LOGS"),
    exhaustMap$(() =>
      storage.fetch("request-logs")
        .then(JSON.parse)
        .then(fetchLogsSucess)
        .catch(fetchLogsError)
    )
  )

const clearLogs = (action$, state$, { storage }) =>
  action$.pipe(
    ofType$("CLEAR_LOGS"),
    exhaustMap$(() =>
      storage.destroy("request-logs")
        .then(fetchLogsRequest)
        .catch(fetchLogsError)
    )
  )

export default combineEpics(
  mountAppEpic,
  fetchLogs,
  clearLogs,
);
