import { compose, lifecycle, pure, withHandlers } from "recompose";

import { INTRO_COMPLETED } from "../models";
import Intro from "../components/intro";
import { SCREENS } from "../models";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import { getConfigs } from "../selectors";
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
    onFinish: ({ configs, navigation: { reset }, updateConfigs }) => () => {
      updateConfigs({ ...configs, [INTRO_COMPLETED]: true });
      reset({ index: 0, routes: [{ key: SCREENS.HOME, name: SCREENS.HOME }] });
    },
  }),
  lifecycle({
    componentDidMount() {
      SplashScreen.hide();
    },
  }),
  pure,
);

export default enhance(Intro);
