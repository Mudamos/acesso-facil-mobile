const initialState = {
  data: null,
  currentAccount: null,
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
      return { ...state, isWaitingForName: false, tempAccount: null };
    case "CREATE_ACCOUNT_SUCCESS":
      return {
        ...state,
        data: [...state.data, payload],
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
    case "CREATE_ACCOUNT_ABORT":
      return {
        ...state,
        isWaitingForName: false,
        tempAccount: null,
      };
    default:
      return state;
  }
};
