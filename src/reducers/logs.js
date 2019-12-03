const initialState = {
  data: null,
  hasError: null,
};

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "FETCH_LOGS_SUCCESS":
      return {
        ...state,
        data: payload,
        hasError: null,
      };
    case "FETCH_LOGS_ERROR":
      return {
        ...state,
        data: null,
        hasError: payload,
      };
    default:
      return state;
  }
};
