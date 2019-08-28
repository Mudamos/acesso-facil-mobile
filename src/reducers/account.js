const initialState = {};

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "CREATE_ACCOUNT": {
      return { ...state, accountName: payload.accountName };
    }
    default:
      return state;
  }
};
