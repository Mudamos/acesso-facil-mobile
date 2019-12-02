import { compose, lifecycle, pure, withHandlers } from "recompose";

import Home from "../components/home";
import { SCREENS } from "../models";
import SplashScreen from "react-native-splash-screen";
import { changeCurrentAccount } from "../actions";
import { connect } from "react-redux";
import { getCurrentAccount } from "../selectors";

const enhance = compose(
  connect(
    state => ({
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
      navigation.navigate(SCREENS.INTRO_CREATE_ACCOUNT);
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
  pure,
);

export default enhance(Home);
