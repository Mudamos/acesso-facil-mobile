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

export const createAccountAbort = () => ({ type: "CREATE_ACCOUNT_ABORT" });

export const createAccountSuccess = ({ id, accountName, idDevice, publicKey, ...extra }) => ({
  type: "CREATE_ACCOUNT_SUCCESS",
  payload: {
    id,
    accountName,
    idDevice,
    publicKey,
    ...extra,
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

export const notifyQrcodeSuccess = () => ({
  type: "NOTIFY_QRCODE_SUCCESS",
});

export const changeCurrentAccount = id => ({
  type: "CHANGE_CURRENT_ACCOUNT",
  payload: { id },
});

export const qrcodeScan = ({ content, currentAccount }) => ({
  type: "QRCODE_SCAN",
  payload: {
    content,
    currentAccount,
  },
});

export const qrcodeScanSuccess = ({ success, data, currentAccount }) => ({
  type: "QRCODE_SCAN_SUCCESS",
  payload: {
    success,
    data,
    currentAccount,
  },
});

export const qrcodeScanError = raw => ({
  type: "QRCODE_SCAN_ERROR",
  payload: { raw },
});

export const qcodeValidateContent = ({ qrcodeSignedData, publicKey, currentAccount }) => ({
  type: "QRCODE_VALIDATE_CONTENT",
  payload: { qrcodeSignedData, publicKey, currentAccount },
})

export const requestNewAccountName = tempAccount => ({
  type: "REQUEST_NEW_ACCOUNT_NAME",
  payload: {
    tempAccount,
  },
});

export const deleteAccount = id => ({
  type: "DELETE_ACCOUNT",
  payload: { id },
});

export const deleteAccountSuccess = () => ({
  type: "DELETE_ACCOUNT_SUCCESS",
});

export const deleteAccountError = raw => ({
  type: "DELETE_ACCOUNT_ERROR",
  payload: { raw },
});
