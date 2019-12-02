import { abortAccountDelete, deleteAccount } from "../actions";
import { compose, pure, withHandlers } from "recompose";

import DeleteAccountModal from "../components/delete-account-modal";
import { connect } from "react-redux";
import { getAccountToDelete } from "../selectors";

const enhance = compose(
  connect(
    state => ({
      accountToDelete: getAccountToDelete(state),
    }),
    {
      abortAccountDelete,
      deleteAccount,
    },
  ),
  withHandlers({
    deleteAccount: ({ deleteAccount, accountToDelete = {} }) => () =>
      deleteAccount(accountToDelete.id),
  }),
  pure,
);

export default enhance(DeleteAccountModal);
