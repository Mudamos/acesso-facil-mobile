import { compose, lifecycle, mapProps, pure, renderNothing, withProps } from "recompose";
import { isNil, omit } from "ramda";

import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import { fetchConfigs } from "../actions";
import { getConfigs } from "../selectors";

const enhance = compose(
  connect(state => ({
    configs: getConfigs(state),
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      const hasDiffProp = prop => this.props[prop] !== prevProps[prop];

      if (hasDiffProp("configs")) {
        SplashScreen.hide();
        if (this.props.configs[INTRO_COMPLETED]) {
          this.props.navigation.replace("Home");
        } else {
          this.props.navigation.replace("Intro");
        }
      }
    },
  }),
  mapProps(omit(["configs", "navigation"])),
  pure,
);

export default enhance(renderNothing);
