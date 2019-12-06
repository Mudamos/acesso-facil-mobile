import { compose, pure, withPropsOnChange } from "recompose";
import { getCurrentAccount, getNotifySuccess } from "../selectors";

import QRCodeLogin from "../components/qrcode-login";
import { connect } from "react-redux";

const enhance = compose(
  connect(state => ({
    currentAccount: getCurrentAccount(state),
    notifySuccess: getNotifySuccess(state),
  })),
  withPropsOnChange(["notifySuccess"], ({ notifySuccess, navigation }) => {
    if (notifySuccess) {
      navigation.popToTop();
    }
  }),
  pure,
);

export default enhance(QRCodeLogin);
