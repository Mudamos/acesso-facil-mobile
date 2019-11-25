import { compose, mapProps, pure, withHandlers } from "recompose";
import { getAccounts, getCurrentAccount } from "../selectors";

import Home from "../components/home";
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
      navigation.navigate("CreateAccount");
      if (currentAccount) {
        changeCurrentAccount(null);
      }
    },
    onLogin: ({ changeCurrentAccount, navigation }) => account => {
      changeCurrentAccount(account);
      navigation.navigate("Login");
    },
  }),
  mapProps(omit(["accounts", "currentAccount", "changeCurrentAccount"])),
  pure,
);

export default enhance(Home);
