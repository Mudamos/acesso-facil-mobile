import { Buffer } from "buffer";
import { tap } from "ramda";

export const isDev = __DEV__;

export const toJsonBase64 = object =>
  Buffer.from(JSON.stringify(object), "utf8").toString("base64");

export const log = tap((...args) => isDev && console.log(...args));
