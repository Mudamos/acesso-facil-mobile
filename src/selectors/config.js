import { pipe, prop } from "ramda";

const baseSelector = prop("configs");

export const hasLoadedConfigs = pipe(
  baseSelector,
  prop("hasLoaded"),
);

export const getConfigs = pipe(
  baseSelector,
  prop("data"),
);

export const getConfig = config => state => prop(config, getConfigs(state));
