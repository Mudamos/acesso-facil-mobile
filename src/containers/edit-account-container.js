import {
  compose,
  lifecycle,
  pure,
  withHandlers,
  withProps,
  withPropsOnChange,
} from "recompose";
import {
  getLoadingMessage,
  getNotifySuccess,
  getTempAccount,
} from "../selectors";

import EditAccount from "../components/edit-account";
import { abortCreateAccount } from "../actions";
import { connect } from "react-redux";
import { createAccount } from "../actions";
import { path } from "ramda";

const enhance = compose(
  connect(
    state => ({
      loadingMessage: getLoadingMessage(state),
      notifySuccess: getNotifySuccess(state),
      tempAccount: getTempAccount(state),
    }),
    {
      abortCreateAccount,
      createAccount,
    },
  ),
  withProps(({ route, tempAccount }) => ({
    account: path(["params", "account"], route) || tempAccount,
  })),
  withHandlers({
    onSubmit: ({ createAccount }) => newAccount => {
      createAccount(newAccount);
    },
  }),
  withPropsOnChange(["notifySuccess"], ({ notifySuccess, navigation }) => {
    if (notifySuccess) {
      navigation.popToTop();
    }
  }),
  lifecycle({
    componentWillUnmount() {
      if (!this.props.notifySuccess) {
        this.props.abortCreateAccount();
      }
    },
  }),
  pure,
);

export default enhance(EditAccount);
