import { curry, head, isEmpty, propOr } from "ramda";

const MAPPED_ERRORS = [
  {
    pattern: /.*java.lang.String.getBytes.*/i,
    message: "Não foi possível ler o QRCode, tente novamente",
  },
  {
    pattern: /.*Network request failed.*/i,
    message: "Não foi possível conectar com o servidor, tente novamente",
  },
];

const testPattern = curry((error, mappedError) =>
  mappedError.pattern.test(error),
);

const formatErrorPayload = payload => {
  const error = propOr(payload.raw, "message", payload.raw);

  const mappedErrors = MAPPED_ERRORS.filter(testPattern(error));

  if (isEmpty(mappedErrors)) {
    return error;
  }

  return head(mappedErrors).message;
};

const initialState = {
  notifySuccess: null,
  isScanning: false,
  loadingMessage: null,
  notifyError: null,
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
        notifyError: null,
        loadingMessage: "Validando QRCode",
      };
    case "QRCODE_SCAN_SUCCESS":
      return {
        ...state,
        loadingMessage: "Verificando identidade",
      };
    case "REQUEST_NEW_ACCOUNT_NAME": {
      return {
        ...state,
        isScanning: false,
        loadingMessage: null,
      };
    }
    case "CREATE_ACCOUNT":
      return {
        ...state,
        isScanning: true,
        loadingMessage: "Criando identidade",
      };
    case "ACCOUNT_LOGIN":
      return {
        ...state,
        loadingMessage: "Acessando",
      };
    case "CREATE_ACCOUNT_SUCCESS":
      return {
        ...state,
        isScanning: false,
        notifySuccess: "Identidade criada com sucesso!",
        loadingMessage: null,
      };
    case "ACCOUNT_LOGIN_SUCCESS":
      return {
        ...state,
        isScanning: false,
        notifySuccess: "Login feito com sucesso!",
        loadingMessage: null,
      };
    case "DISMISS_NOTIFY_SUCCESS":
      return {
        ...state,
        notifySuccess: null,
      };
    case "DISMISS_NOTIFY_ERROR":
      return {
        ...state,
        notifyError: null,
      };
    case "ABORT_CREATE_ACCOUNT":
      return {
        ...state,
        isScanning: false,
        notifyError: null,
        notifySuccess: null,
        loadingMessage: null,
      };
    case "CREATE_ACCOUNT_ERROR":
    case "FETCH_ACCOUNTS_ERROR":
    case "ACCOUNT_LOGIN_ERROR":
    case "QRCODE_SCAN_ERROR":
      return {
        ...state,
        isScanning: false,
        loadingMessage: null,
        notifyError: formatErrorPayload(payload),
      };
    default:
      return state;
  }
};
