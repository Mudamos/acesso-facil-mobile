import { compose, pure, withProps, withPropsOnChange } from "recompose";
import { getTempAccount, isWaitingForName } from "../selectors";

import QRCodeCreateAccount from "../components/qrcode-create-account";
import { SCREENS } from "../models";
import { connect } from "react-redux";

const enhance = compose(
  connect(state => ({
    isWaitingForName: isWaitingForName(state),
    tempAccount: getTempAccount(state),
  })),
  withProps(({ notifyError }) => ({
    hasError: !!notifyError,
  })),
  withPropsOnChange(
    ["isWaitingForName", "tempAccount"],
    ({ isWaitingForName, tempAccount, navigation }) => {
      if (isWaitingForName && tempAccount) {
        navigation.push(SCREENS.EDIT_ACCOUNT, { account: tempAccount });
      }
    },
  ),
  pure,
);

export default enhance(QRCodeCreateAccount);
