export const fetchConfigs = () => ({
  type: "FETCH_CONFIGS",
});

export const fetchConfigsSuccess = configs => ({
  type: "FETCH_CONFIGS_SUCCESS",
  payload: { configs },
});

export const fetchConfigsError = raw => ({
  type: "FETCH_CONFIGS_ERROR",
  payload: { raw },
});

export const updateConfigs = configs => ({
  type: "UPDATE_CONFIGS",
  payload: { configs },
});

export const updateConfigsSuccess = () => ({
  type: "UPDATE_CONFIGS_SUCCESS",
});

export const updateConfigsError = raw => ({
  type: "UPDATE_CONFIGS_ERROR",
  payload: { raw },
});
