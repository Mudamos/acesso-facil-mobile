import {
  accountLoginError,
  accountLoginSuccess,
  createAccountError,
  createAccountSuccess,
  fetchAccountsError,
  fetchAccountsSuccess,
} from "../actions";
import {
  exhaustMap as exhaustMap$,
  switchMap as switchMap$,
} from "rxjs/operators";
import { filter, propEq } from "ramda";
import { log, toJsonBase64 } from "../utils";

import { combineEpics } from "redux-observable";
import { ofType as ofType$ } from "redux-observable";

const rejectUncommitted = filter(propEq("committed", true));

const createAccount = (action$, state$, { accountManager, api }) =>
  action$.pipe(
    ofType$("CREATE_ACCOUNT"),
    exhaustMap$(async ({ payload: { accountName, ...extraApiArgs } }) => {
      try {
        const account = await accountManager.createAccount({ accountName });
        const content = toJsonBase64({ ...extraApiArgs, accountName });
        const signature = await accountManager.signMessage(account.id, content);

        log({ signature, account, content });
        await api.createAccount({
          content,
          publicKey: account.publicKey,
          signature,
        });

        return accountManager
          .commit(account.id)
          .then(createAccountSuccess)
          .catch(createAccountError);
      } catch (error) {
        log(error && error.stacktrace);
        await accountManager.destroyUncommited();
        return createAccountError(error);
      }
    }),
  );

const fetchAccounts = (action$, state$, { accountManager }) =>
  action$.pipe(
    ofType$("FETCH_ACCOUNTS"),
    switchMap$(() =>
      accountManager
        .fetchAccounts()
        .then(log)
        .then(rejectUncommitted)
        .then(fetchAccountsSuccess)
        .catch(fetchAccountsError),
    ),
  );

const login = (action$, state$, { accountManager, api }) =>
  action$.pipe(
    ofType$("ACCOUNT_LOGIN"),
    switchMap$(({ payload: { contentEncoded, id } }) =>
      accountManager
        .signMessage(id, contentEncoded)
        .then(signature => api.login({ content: contentEncoded, signature }))
        .then(accountLoginSuccess)
        .catch(accountLoginError),
    ),
  );

export default combineEpics(createAccount, fetchAccounts, login);
