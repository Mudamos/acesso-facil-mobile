const initialState = {
  data: null,
  hasLoaded: false,
};

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "FETCH_CONFIGS":
      return {
        ...state,
        hasLoaded: false,
      };
    case "FETCH_CONFIGS_SUCCESS":
      return {
        ...state,
        data: payload.configs,
        hasLoaded: true,
      };
    default:
      return state;
  }
};
