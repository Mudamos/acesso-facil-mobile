import {
  branch,
  compose,
  pure,
  renderNothing,
  withProps,
  withState,
} from "recompose";
import { prop, propOr } from "ramda";

import EditAccountModal from "../components/edit-account-modal";
import { connect } from "react-redux";
import { createAccount } from "../actions";
import { getTempAccount } from "../selectors";

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
  branch(({ account }) => !account, renderNothing),
  withState("customName", "setCustomName", propOr("", "defaultAccountName")),
  pure,
);

export default enhance(EditAccountModal);
