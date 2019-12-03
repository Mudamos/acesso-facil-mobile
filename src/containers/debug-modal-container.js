import {
  branch,
  compose,
  pure,
  renderNothing,
  withProps,
  withState,
} from "recompose";
import { clearLogs, fetchLogs } from "../actions";
import { getLogs, hasLogError } from "../selectors";
import { prop, propOr } from "ramda";

import DebugModal from "../components/debug-modal";
import { connect } from "react-redux";

const enhance = compose(
  connect(
    state => ({
      logs: getLogs(state),
      hasLogError: hasLogError(state),
    }),
    {
      clearLogs,
      fetchLogs,
    },
  ),
  pure,
);

export default enhance(DebugModal);
