import { pipe, prop, propEq } from "ramda";

import { createSelector } from "reselect";

const baseSelector = prop("accounts");

export const getAccounts = pipe(
  baseSelector,
  prop("data"),
);

const getCurrentAccountId = pipe(
  baseSelector,
  prop("currentAccount"),
);

export const getCurrentAccount = createSelector(
  [getAccounts, getCurrentAccountId],
  (accounts, currentAccountId) => accounts.find(propEq("id", currentAccountId)),
);

export const isWaitingForName = pipe(
  baseSelector,
  prop("isWaitingForName"),
);

export const getTempAccount = pipe(
  baseSelector,
  prop("tempAccount"),
);
