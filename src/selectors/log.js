import { pipe, prop } from "ramda";

import { createSelector } from "reselect";

const baseSelector = prop("logs");

export const getLogs = pipe(
  baseSelector,
  prop("data"),
);

export const hasLogError = pipe(
  baseSelector,
  prop("hasError"),
);
