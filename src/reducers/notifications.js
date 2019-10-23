import { curry, head, isEmpty, propOr } from "ramda";

const MAPPED_ERRORS = [
  {
    pattern: /.*java.lang.String.getBytes.*/i,
    message: "Não foi possível ler o QRCode, tente novamente",
  },
  {
    pattern: /.*Network request failed.*/i,
    message: "Não foi possível conectar com o servidor, tente novamente",
  }
];

const testPattern = curry((error, mappedError) => mappedError.pattern.test(error));

const formatErrorPayload = payload => {
  const error = propOr(payload.raw, "message", payload.raw);

  const mappedErrors = MAPPED_ERRORS.filter(testPattern(error));

  if (isEmpty(mappedErrors)) {
    return error;
  }

  return head(mappedErrors).message;
};

const initialState = {
  notifyQrcodeSuccess: false,
  isScanning: false,
  scannerLoadingMessage: null,
  scannerError: null,
};

export default (state = initialState, action) => {
  if (!action) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case "QRCODE_SCAN":
      return {
        ...state,
        isScanning: true,
        scannerError: null,
        scannerLoadingMessage: "Validando QRCode",
      };
    case "QRCODE_SCAN_SUCCESS":
      return {
        ...state,
        scannerLoadingMessage: "Verificando identidade",
      };
    case "REQUEST_NEW_ACCOUNT_NAME": {
      return {
        ...state,
        isScanning: false,
        scannerLoadingMessage: null,
      };
    }
    case "CREATE_ACCOUNT":
      return {
        ...state,
        isScanning: true,
        scannerLoadingMessage: "Criando identidade",
      };
    case "ACCOUNT_LOGIN":
      return {
        ...state,
        scannerLoadingMessage: "Acessando",
      };
    case "SHOW_NOTIFY_QRCODE_SUCCESS":
    case "CREATE_ACCOUNT_SUCCESS":
      return {
        ...state,
        isScanning: false,
        notifyQrcodeSuccess: true,
        scannerLoadingMessage: null,
      };
    case "DISMISS_NOTIFY_QRCODE_SUCCESS":
      return {
        ...state,
        notifyQrcodeSuccess: false,
        scannerError: null,
      };
    case "CREATE_ACCOUNT_ABORT":
      return {
        ...state,
        isScanning: false,
        scannerError: null,
        notifyQrcodeSuccess: false,
        scannerLoadingMessage: null,
      };
    case "CREATE_ACCOUNT_ERROR":
    case "FETCH_ACCOUNTS_ERROR":
    case "ACCOUNT_LOGIN_ERROR":
    case "QRCODE_SCAN_ERROR":
      return {
        ...state,
        isScanning: false,
        scannerLoadingMessage: null,
        scannerError: formatErrorPayload(payload),
      };
    default:
      return state;
  }
};
