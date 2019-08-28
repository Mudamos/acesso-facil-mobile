import { mapTo } from "rxjs/operators";
import { ofType } from "redux-observable";

export const createAccount = (action$, state$, { getJSON }) =>
  action$.pipe(
    ofType("CREATE_ACCOUNT"),
    mapTo({ type: "DONE" }),
  );
