export const createAccount = ({ accountName, ...extra }) => ({
  type: "CREATE_ACCOUNT",
  payload: {
    accountName,
    ...extra,
  },
});

export const createAccountError = raw => ({
  type: "CREATE_ACCOUNT_ERROR",
  payload: {
    raw,
  },
});

export const createAccountSuccess = ({ id, name, publicKey }) => ({
  type: "CREATE_ACCOUNT_SUCCESS",
  payload: {
    id,
    name,
    publicKey,
  },
});

export const fetchAccounts = () => ({
  type: "FETCH_ACCOUNTS",
});

export const fetchAccountsError = raw => ({
  type: "FETCH_ACCOUNTS_ERROR",
  payload: {
    raw,
  },
});

export const fetchAccountsSuccess = accounts => ({
  type: "FETCH_ACCOUNTS_SUCCESS",
  payload: { accounts },
});

export const accountLogin = ({ contentEncoded, id }) => ({
  type: "ACCOUNT_LOGIN",
  payload: { contentEncoded, id },
});

export const accountLoginError = raw => ({
  type: "ACCOUNT_LOGIN_ERROR",
  payload: {
    raw,
  },
});

export const accountLoginSuccess = () => ({
  type: "ACCOUNT_LOGIN_SUCCESS",
});
