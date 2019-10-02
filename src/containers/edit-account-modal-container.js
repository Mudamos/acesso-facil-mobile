import {
  branch,
  compose,
  pure,
  renderNothing,
  withProps,
  withState,
} from "recompose";

import EditAccountModal from "../components/edit-account-modal";
import { connect } from "react-redux";
import { createAccount } from "../actions";
import { getTempAccount } from "../selectors";
import { prop } from "ramda";

const enhance = compose(
  connect(
    state => ({
      account: getTempAccount(state),
    }),
    {
      createAccount,
    },
  ),
  withProps(({ account }) => ({
    defaultAccountName: prop("accountName", account),
  })),
  branch(({ defaultAccountName }) => !defaultAccountName, renderNothing),
  withState("customName", "setCustomName", prop("defaultAccountName")),
  pure,
);

export default enhance(EditAccountModal);
