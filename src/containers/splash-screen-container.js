import { compose, lifecycle, pure, renderNothing } from "recompose";
import { getConfig, hasLoadedConfigs } from "../selectors";

import { INTRO_COMPLETED } from "../models";
import { SCREENS } from "../models";
import { connect } from "react-redux";

const enhance = compose(
  connect(state => ({
    hasCompletedAppIntro: getConfig(INTRO_COMPLETED)(state),
    hasLoadedConfigs: hasLoadedConfigs(state),
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      const hasDiffProp = prop => this.props[prop] !== prevProps[prop];

      if (hasDiffProp("hasLoadedConfigs") && this.props.hasLoadedConfigs) {
        if (this.props.hasCompletedAppIntro) {
          this.props.navigation.replace(SCREENS.HOME);
        } else {
          this.props.navigation.replace(SCREENS.APP_INTRO);
        }
      }
    },
  }),
  pure,
);

export default enhance(renderNothing());
