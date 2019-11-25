import { compose, mapProps, pure, withHandlers } from "recompose";

import { INTRO_COMPLETED } from "../constants";
import Intro from "../components/intro";
import { connect } from "react-redux";
import { getConfigs } from "../selectors";
import { omit } from "ramda";
import { updateConfigs } from "../actions";

const enhance = compose(
  connect(
    state => ({
      configs: getConfigs(state),
    }),
    {
      updateConfigs,
    },
  ),
  withHandlers({
    onFinish: ({ configs, navigation: { replace }, updateConfigs }) => () => {
      updateConfigs({ ...configs, [INTRO_COMPLETED]: true });
      replace("Home");
    },
  }),
  mapProps(omit(["configs", "navigation", "updateConfigs"])),
  pure,
);

export default enhance(Intro);
