import { combineEpics, ofType as ofType$ } from "redux-observable";
import {
  concatMap as concatMap$,
  switchMap as switchMap$,
} from "rxjs/operators";
import { delay, log } from "../utils";
import {
  fetchConfigsError,
  fetchConfigs as fetchConfigsRequest,
  fetchConfigsSuccess,
  updateConfigsError,
  updateConfigsSuccess,
} from "../actions";

const mountAppEpic = action$ =>
  action$.pipe(
    ofType$("APP_DID_MOUNT"),
    concatMap$(() =>
      Promise.resolve()
        .then(delay(3000))
        .then(fetchConfigsRequest),
    ),
  );

const fetchConfigsEpic = (action$, state$, { configManager }) =>
  action$.pipe(
    ofType$("FETCH_CONFIGS"),
    switchMap$(() =>
      configManager
        .fetchConfigs()
        .then(configs => log("Configs") || log(configs) || configs)
        .then(fetchConfigsSuccess)
        .catch(fetchConfigsError),
    ),
  );

const updateConfigsEpic = (action$, state$, { configManager }) =>
  action$.pipe(
    ofType$("UPDATE_CONFIGS"),
    switchMap$(({ payload: { configs, config, value } }) =>
      configManager
        .updateConfigs({ ...configs, [config]: value })
        .then(updateConfigsSuccess)
        .catch(updateConfigsError),
    ),
  );

export default combineEpics(fetchConfigsEpic, mountAppEpic, updateConfigsEpic);
