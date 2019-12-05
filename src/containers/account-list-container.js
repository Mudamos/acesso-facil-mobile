import {
  changeCurrentAccount,
  deleteAccount,
  fetchAccounts,
  prepareAccountToDelete,
} from "../actions";
import { compose, lifecycle, pure, withHandlers } from "recompose";

import AccountList from "../components/account-list";
import { connect } from "react-redux";
import { getAccounts } from "../selectors";

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
    onDeleteAccount: ({ prepareAccountToDelete }) => ({ id }) =>
      prepareAccountToDelete(id),
  }),
  pure,
);

export default enhance(AccountList);
