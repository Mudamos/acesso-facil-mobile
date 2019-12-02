import {
  changeCurrentAccount,
  deleteAccount,
  fetchAccounts,
  prepareAccountToDelete,
} from "../actions";
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
      deleteAccount,
      fetchAccounts,
      prepareAccountToDelete,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchAccounts();
    },
  }),
  withHandlers({
    onDeleteAccount: ({ prepareAccountToDelete }) => ({ id, accountName }) =>
      prepareAccountToDelete(id),
  }),
  mapProps(omit(["changeCurrentAccount", "deleteAccount", "fetchAccounts"])),
  pure,
);

export default enhance(AccountList);
