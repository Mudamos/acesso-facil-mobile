import {
  accountLogin,
  accountLoginError,
  createAccountError,
  createAccountSuccess,
  deleteAccountError,
  deleteAccountSuccess,
  fetchAccountsError,
  fetchAccounts as fetchAccountsRequest,
  fetchAccountsSuccess,
  notifyQrcodeSuccess,
  qrcodeScanError,
  qrcodeScanSuccess,
  requestNewAccountName,
  showNotifyQrcodeSuccess,
} from "../actions";
import { delay, fromJsonBase64, log, toJsonBase64 } from "../utils";
import {
  exhaustMap as exhaustMap$,
  mergeMap as mergeMap$,
  switchMap as switchMap$,
} from "rxjs/operators";
import { filter, identity, prop, propEq } from "ramda";

import { combineEpics } from "redux-observable";
import { getCurrentAccount } from "../selectors";
import { of } from "rxjs";
import { ofType as ofType$ } from "redux-observable";

const rejectUncommitted = filter(propEq("committed", true));

const mountApp = action$ =>
  action$.pipe(
    ofType$("APP_DID_MOUNT"),
    exhaustMap$(() =>
      Promise.resolve()
        .then(delay(3000))
        .then(fetchAccountsRequest),
    ),
  );

const createAccount = (action$, state$, { accountManager, api }) =>
  action$.pipe(
    ofType$("CREATE_ACCOUNT"),
    exhaustMap$(async ({ payload: { accountName, ...extraApiArgs } }) => {
      try {
        const account = await accountManager.createAccount({ accountName });
        const content = toJsonBase64({
          ...extraApiArgs,
          accountName,
          idDevice: account.idDevice,
        });
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
        .then(accounts => log(accounts) || accounts)
        .then(rejectUncommitted)
        .then(fetchAccountsSuccess)
        .catch(fetchAccountsError),
    ),
  );

const deleteAccount = (action$, state$, { accountManager }) =>
  action$.pipe(
    ofType$("DELETE_ACCOUNT"),
    exhaustMap$(({ payload: { id } }) =>
      accountManager
        .deleteAccount(id)
        .then(() => [deleteAccountSuccess(), fetchAccountsRequest()])
        .catch(error => [deleteAccountError(error)]),
    ),
    mergeMap$(identity),
  );

const login = (action$, state$, { accountManager, api }) =>
  action$.pipe(
    ofType$("ACCOUNT_LOGIN"),
    switchMap$(({ payload: { contentEncoded, id } }) =>
      accountManager
        .signMessage(id, contentEncoded)
        .then(signature => api.login({ content: contentEncoded, signature }))
        .then(() => [notifyQrcodeSuccess(), showNotifyQrcodeSuccess()])
        .catch(error => [accountLoginError(error)]),
    ),
    mergeMap$(identity),
  );

const qrcodeAccountVerify = (action$, state$, { accountManager, api }) =>
  action$.pipe(
    ofType$("QRCODE_SCAN"),
    exhaustMap$(async ({ payload: { content, currentAccount } }) => {
      try {
        const [contentEncoded, signature] = content.split(";");
        const publicKey = await api.fetchPublicKey().then(prop("publicKey"));

        return accountManager
          .verifyMessageWithPublicKey(signature, contentEncoded, publicKey)
          .then(success => {
            if (success) {
              return { success, data: fromJsonBase64(contentEncoded) };
            }

            return Promise.reject("QRCode inválido");
          })
          .then(({ success, data }) => qrcodeScanSuccess({ success, data, currentAccount }))
          .catch(qrcodeScanError);
      } catch (error) {
        return qrcodeScanError(error);
      }
    }),
  );

const qrcodeAccountSuccess = (action$, state$) =>
  action$.pipe(
    ofType$("QRCODE_SCAN_SUCCESS"),
    exhaustMap$(({ payload: { data, currentAccount } }) => {
      try {
        if (currentAccount) {
          return of(
            accountLogin({
              id: currentAccount.id,
              contentEncoded: toJsonBase64({
                ...data,
                idDevice: currentAccount.idDevice,
              }),
            }),
          );
        }

        return of(requestNewAccountName(data));
      } catch (error) {
        return of(qrcodeScanError(error));
      }
    }),
  );

export default combineEpics(
  mountApp,
  createAccount,
  deleteAccount,
  fetchAccounts,
  login,
  qrcodeAccountVerify,
  qrcodeAccountSuccess,
);
