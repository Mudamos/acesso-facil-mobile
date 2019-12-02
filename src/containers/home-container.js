import { compose, lifecycle, mapProps, pure, withHandlers } from "recompose";
import { getAccounts, getCurrentAccount } from "../selectors";

import Home from "../components/home";
import { SCREENS } from "../models";
import SplashScreen from "react-native-splash-screen";
import { changeCurrentAccount } from "../actions";
import { connect } from "react-redux";
import { omit } from "ramda";

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
      navigation.navigate(SCREENS.CREATE_ACCOUNT);
      if (currentAccount) {
        changeCurrentAccount(null);
      }
    },
    onLogin: ({ changeCurrentAccount, navigation }) => accountId => {
      changeCurrentAccount(accountId);
      navigation.navigate(SCREENS.LOGIN);
    },
  }),
  lifecycle({
    componentDidMount() {
      SplashScreen.hide();
    },
  }),
  lifecycle({
    componentDidMount() {
      SplashScreen.hide();
    },
  }),
  mapProps(omit(["accounts", "currentAccount", "changeCurrentAccount"])),
  pure,
);

export default enhance(Home);
