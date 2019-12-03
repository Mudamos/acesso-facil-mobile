import { compose, lifecycle, mapProps, pure, withHandlers } from "recompose";
import {
  abortCreateAccount,
  dismissNotifyQrcodeSuccess,
  qrcodeScan,
} from "../actions";
import {
  getScannerError,
  getScannerLoadingMessage,
  hasSuccessOnQrcodeScan,
  isScanning,
  isWaitingForName,
} from "../selectors";

import { Alert } from "react-native";
import QRCodeCreateAccount from "../components/qrcode-create-account";
import { connect } from "react-redux";
import { omit } from "ramda";

const enhance = compose(
  connect(
    state => ({
      hasSuccessOnQrcodeScan: hasSuccessOnQrcodeScan(state),
      isScanning: isScanning(state),
      scannerError: getScannerError(state),
      loadingMessage: getScannerLoadingMessage(state),
      isWaitingForName: isWaitingForName(state),
    }),
    {
      dismissNotifyQrcodeSuccess,
      qrcodeScan,
      abortCreateAccount,
    },
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      const hasDiffProp = prop => this.props[prop] !== prevProps[prop];

      if (
        hasDiffProp("hasSuccessOnQrcodeScan") &&
        this.props.hasSuccessOnQrcodeScan
      ) {
        this.props.navigation.goBack();
        Alert.alert("Acesso Fácil", "Identidade criada com sucesso", [
          {
            text: "Ok",
            onPress: () => this.props.dismissNotifyQrcodeSuccess(),
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
      if (this.props.isScanning || this.props.isWaitingForName) {
        this.props.abortCreateAccount();
      }
      this.props.dismissNotifyQrcodeSuccess();
    },
  }),
  withHandlers({
    onBack: ({ navigation: { goBack } }) => () => goBack(),
    onQrcodeScan: ({ qrcodeScan }) => ({ content }) => qrcodeScan({ content }),
  }),
  mapProps(omit(["dismissNotifyQrcodeSuccess", "abortCreateAccount"])),
  pure,
);

export default enhance(QRCodeCreateAccount);
