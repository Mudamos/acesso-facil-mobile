import { pipe, prop } from "ramda";

const baseSelector = prop("notifications");

export const getNotifySuccess = pipe(
  baseSelector,
  prop("notifySuccess"),
);

export const isScanning = pipe(
  baseSelector,
  prop("isScanning"),
);

export const getNotifyError = pipe(
  baseSelector,
  prop("notifyError"),
);

export const getLoadingMessage = pipe(
  baseSelector,
  prop("loadingMessage"),
);
