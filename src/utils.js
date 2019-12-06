import { is, isEmpty, isNil } from "ramda";

import { Buffer } from "buffer";

export const isDev = __DEV__;

export const toJsonBase64 = object =>
  Buffer.from(JSON.stringify(object), "utf8").toString("base64");

export const fromJsonBase64 = stringBase64 =>
  JSON.parse(new Buffer(stringBase64, "base64").toString());

export const log = (...args) => isDev && console.log(...args);

export const delay = ms => result =>
  new Promise(resolve => setTimeout(() => resolve(result), ms));

export const isFunction = is(Function);

export const isBlank = value => isEmpty(value) || isNil(value);
