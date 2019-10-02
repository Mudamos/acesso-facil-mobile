import { propOr } from "ramda";

const GENERIC_ERRORS_PATTERN = [
  /.*java.lang.String.getBytes.*/i,
  /.*Network request failed.*/i,
];

const formatErrorPayload = payload => {
  const error = propOr(payload.raw, "message", payload.raw);

  if (
    GENERIC_ERRORS_PATTERN.map(pattern => pattern.test(error)).some(Boolean)
  ) {
    return "Um erro inesperado aconteceu, tente novamente";
  }

  return error;
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
