import { pipe, prop } from "ramda";

const baseSelector = prop("notifications");

export const hasSuccessOnQrcodeScan = pipe(
  baseSelector,
  prop("notifyQrcodeSuccess"),
);

export const isScanning = pipe(
  baseSelector,
  prop("isScanning"),
);

export const getScannerError = pipe(
  baseSelector,
  prop("scannerError"),
);

export const getScannerLoadingMessage = pipe(
  baseSelector,
  prop("scannerLoadingMessage"),
);
