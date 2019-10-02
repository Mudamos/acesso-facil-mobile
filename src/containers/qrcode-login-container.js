import {
  changeCurrentAccount,
  dismissNotifyQrcodeSuccess,
  qrcodeScan,
} from "../actions";
import { compose, lifecycle, mapProps, pure, withHandlers } from "recompose";
import {
  getCurrentAccount,
  getScannerError,
  getScannerLoadingMessage,
  hasSuccessOnQrcodeScan,
  isScanning,
} from "../selectors";

import { Alert } from "react-native";
import QRCodeLogin from "../components/qrcode-login";
import { connect } from "react-redux";
import { omit } from "ramda";

const enhance = compose(
  connect(
    state => ({
      currentAccount: getCurrentAccount(state),
      hasSuccessOnQrcodeScan: hasSuccessOnQrcodeScan(state),
      isScanning: isScanning(state),
      scannerError: getScannerError(state),
      loadingMessage: getScannerLoadingMessage(state),
    }),
    {
      changeCurrentAccount,
      dismissNotifyQrcodeSuccess,
      qrcodeScan,
    },
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      const hasDiffProp = prop => this.props[prop] !== prevProps[prop];

      if (
        hasDiffProp("hasSuccessOnQrcodeScan") &&
        this.props.hasSuccessOnQrcodeScan
      ) {
        Alert.alert("Acesso Fácil", "Login feito com sucesso", [
          {
            text: "Ok",
            onPress: () => {
              this.props.dismissNotifyQrcodeSuccess();
              this.props.changeCurrentAccount(null);
            },
          },
        ]);
      }

      if (hasDiffProp("scannerError") && this.props.scannerError) {
        Alert.alert("Acesso Fácil", this.props.scannerError, [
          {
            text: "Ok",
            onPress: () => this.props.dismissNotifyQrcodeSuccess(),
          },
        ]);
      }
    },
    componentWillUnmount() {
      this.props.dismissNotifyQrcodeSuccess();
    },
  }),
  withHandlers({
    onQrcodeScan: ({ currentAccount, qrcodeScan }) => ({ content }) =>
      qrcodeScan({ currentAccount, content }),
  }),
  mapProps(
    omit([
      "currentAccount",
      "hasSuccessOnQrcodeScan",
      "scannerError",
      "dismissNotifyQrcodeSuccess",
      "qrcodeScan",
    ]),
  ),
  pure,
);

export default enhance(QRCodeLogin);
