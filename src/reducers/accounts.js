const initialState = {
  data: null,
  //   data: [
  //     {
  //       accountName: "Teste",
  //       committed: true,
  //       publicKey: `-----BEGIN RSA PUBLIC KEY-----
  // MIIBCgKCAQEAoNINeOFi7L9TxLsbxzj+RW7wgXGFAwMxq4GUP9dGPbfIVI2k1W3Z
  // V2vMV640ZE2uX1rymYAYvFbWHWsf6IIflYMhgTQl5N8/8VfRXKqnQBfVudmTnDqT
  // DiZIYBG54L3/QSdpCeF6yQyoc6ageTsCBPADNHD3cpxSBISTifQcAT9PlQLSaqzb
  // WXJjKYNU83NMNznYFSLSRLjSU1fCdIFaJngsKygDUdl24MBtCwe+tYIuzyibO41A
  // 6uIIwqkwbBrkR2i2PtGpVQdcpKn5g316lEVYsreLsdAwCIv7Usaeau9AVfzQtrtl
  // vVao8YhAXj2Ka953ZLj6+WG65TbFfVSCIQIDAQAB
  // -----END RSA PUBLIC KEY-----
  // `,
  //       idDevice: "06290fbd5372796a3010f89716fb44845bad3a5f",
  //       id:
  //         "org.itsrio.sefaz.easyaccess.key.a3d0e110-1796-11ea-a867-0b866285fc4b",
  //     },
  //   ],
  currentAccount: null,
  accountToDelete: null,
  isWaitingForName: false,
  tempAccount: null,
};

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "CREATE_ACCOUNT":
      return { ...state, isWaitingForName: false };
    case "CREATE_ACCOUNT_SUCCESS":
      return {
        ...state,
        data: [...state.data, payload],
        tempAccount: null,
      };
    case "FETCH_ACCOUNTS_SUCCESS":
      return {
        ...state,
        data: payload.accounts,
      };
    case "CHANGE_CURRENT_ACCOUNT":
      return {
        ...state,
        currentAccount: payload.id,
        isWaitingForName: false,
        tempAccount: null,
      };
    case "REQUEST_NEW_ACCOUNT_NAME":
      return {
        ...state,
        isWaitingForName: true,
        tempAccount: payload.tempAccount,
      };
    case "ABORT_CREATE_ACCOUNT":
      return {
        ...state,
        isWaitingForName: false,
        tempAccount: null,
      };
    case "PREPARE_ACCOUNT_TO_DELETE":
      return {
        ...state,
        accountToDelete: payload.id,
      };
    case "ABORT_ACCOUNT_DELETE":
    case "DELETE_ACCOUNT":
      return {
        ...state,
        accountToDelete: null,
      };
    default:
      return state;
  }
};
