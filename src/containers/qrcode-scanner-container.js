import { compose, lifecycle, pure, withHandlers, withProps } from "recompose";
import { dismissNotifyError, qrcodeScan } from "../actions";
import {
  getCurrentAccount,
  getLoadingMessage,
  getNotifyError,
  getNotifySuccess,
  isScanning,
} from "../selectors";

import QRCodeScanner from "../components/qrcode-scanner";
import { connect } from "react-redux";

const enhance = compose(
  connect(
    state => ({
      currentAccount: getCurrentAccount(state),
      isScanning: isScanning(state),
      loadingMessage: getLoadingMessage(state),
      notifyError: getNotifyError(state),
      notifySuccess: getNotifySuccess(state),
    }),
    {
      qrcodeScan,
      dismissNotifyError,
    },
  ),
  withProps(({ isScanning, notifySuccess, notifyError }) => ({
    hasError: !!notifyError,
    shouldRenderCamera: !isScanning && !notifySuccess && !notifyError,
  })),
  withHandlers({
    onQrcodeScan: ({ currentAccount, qrcodeScan }) => ({ content }) =>
      qrcodeScan({ currentAccount, content }),
  }),
  lifecycle({
    componentWillUnmount() {
      if (this.props.hasError) {
        this.props.dismissNotifyError();
      }
    },
  }),
  pure,
);

export default enhance(QRCodeScanner);
