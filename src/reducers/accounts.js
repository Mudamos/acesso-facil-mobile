const initialState = { data: [] };

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "CREATE_ACCOUNT_SUCCESS": {
      return { ...state, data: [...state.data, payload] };
    }
    case "FETCH_ACCOUNTS_SUCCESS": {
      return { ...state, data: payload.accounts };
    }
    default:
      return state;
  }
};
