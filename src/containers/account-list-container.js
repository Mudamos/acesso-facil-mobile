import { changeCurrentAccount, deleteAccount, fetchAccounts } from "../actions";
import { compose, lifecycle, mapProps, pure, withHandlers } from "recompose";

import AccountList from "../components/account-list";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { getAccounts } from "../selectors";
import { omit } from "ramda";

const enhance = compose(
  connect(
    state => ({
      accounts: getAccounts(state),
    }),
    {
      changeCurrentAccount,
      fetchAccounts,
      deleteAccount,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchAccounts();
    },
  }),
  withHandlers({
    onDeleteAccount: ({ deleteAccount }) => ({ id, name }) => {
      Alert.alert("Acesso Fácil", `Tem certeza que deseja deletar ${name}?`, [
        { text: "Sim", onPress: () => deleteAccount(id) },
        { text: "Não" },
      ]);
    },
  }),
  mapProps(omit(["fetchAccounts", "deleteAccount"])),
  pure,
);

export default enhance(AccountList);
