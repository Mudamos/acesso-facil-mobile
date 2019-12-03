import { compose, lifecycle, mapProps, pure, withHandlers } from "recompose";

import { INTRO_COMPLETED } from "../models";
import Intro from "../components/intro";
import { SCREENS } from "../models";
import SplashScreen from "react-native-splash-screen";
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
      replace(SCREENS.HOME);
    },
  }),
  lifecycle({
    componentDidMount() {
      SplashScreen.hide();
    },
  }),
  mapProps(omit(["configs", "navigation", "updateConfigs"])),
  pure,
);

export default enhance(Intro);
