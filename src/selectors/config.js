import { pipe, prop } from "ramda";

const baseSelector = prop("configs");

export const getConfigs = pipe(
  baseSelector,
  prop("data"),
);
