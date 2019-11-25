const initialState = {
  data: null,
};

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "FETCH_CONFIGS_SUCCESS":
      return {
        ...state,
        data: payload.configs,
      };
    default:
      return state;
  }
};
