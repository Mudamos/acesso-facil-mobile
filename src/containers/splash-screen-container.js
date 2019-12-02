import { compose, lifecycle, mapProps, pure, renderNothing } from "recompose";
import { getConfig, hasLoadedConfigs } from "../selectors";

import { INTRO_COMPLETED } from "../models/config";
import { connect } from "react-redux";
import { omit } from "ramda";

const enhance = compose(
  connect(state => ({
    hasLoadedConfigs: hasLoadedConfigs(state),
    hasCompletedAppIntro: getConfig(INTRO_COMPLETED)(state),
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      const hasDiffProp = prop => this.props[prop] !== prevProps[prop];

      if (hasDiffProp("hasLoadedConfigs") && this.props.hasLoadedConfigs) {
        if (this.props.hasCompletedAppIntro) {
          this.props.navigation.replace("Home");
        } else {
          this.props.navigation.replace("Intro");
        }
      }
    },
  }),
  mapProps(omit(["hasCompletedAppIntro", "hasLoadedConfigs", "navigation"])),
  pure,
);

export default enhance(renderNothing());
