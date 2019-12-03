import { Buffer } from "buffer";
import Config from "react-native-config";

export const isDev = __DEV__;

export const isDebug = Config.DEBUG_MODE === "true";
export const toJsonBase64 = object =>
  Buffer.from(JSON.stringify(object), "utf8").toString("base64");

export const fromJsonBase64 = stringBase64 =>
  JSON.parse(new Buffer(stringBase64, "base64").toString());

export const log = (...args) => isDev && console.log(...args);

export const delay = ms => result =>
  new Promise(resolve => setTimeout(() => resolve(result), ms));
