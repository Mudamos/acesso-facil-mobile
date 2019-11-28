import { compose, lifecycle, mapProps, pure, withHandlers, withProps } from "recompose";
import { getAccounts, getCurrentAccount } from "../selectors";
import { isEmpty, omit, propOr } from "ramda";

import Home from "../components/home";
import { ToastAndroid } from 'react-native';
import { changeCurrentAccount } from "../actions";
import { connect } from "react-redux";

const enhance = compose(
  connect(
    state => ({
      accounts: getAccounts(state),
      currentAccount: getCurrentAccount(state),
    }),
    {
      changeCurrentAccount,
    },
  ),
  withHandlers({
    onCreateAccount: ({
      currentAccount,
      changeCurrentAccount,
      navigation,
    }) => () => {
      navigation.navigate("CreateAccount");
      if (currentAccount) {
        changeCurrentAccount(null);
      }
    },
  }),
  withProps(({ accounts, currentAccount }) => ({
    title: isEmpty(accounts)
      ? "Acesso Fácil SEFAZ"
      : propOr("Selecione uma identidade", "accountName", currentAccount),
    hasCurrentAccount: !!currentAccount,
  })),
  lifecycle({
    componentDidMount() {
      if (__DEV__) {
        ToastAndroid.show('DEBUG MODE ACTIVATED', ToastAndroid.LONG);
      }
    }
  }),
  mapProps(omit(["accounts", "currentAccount", "changeCurrentAccount"])),
  pure,
);

export default enhance(Home);
