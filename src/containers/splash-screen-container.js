import { compose, lifecycle, mapProps, pure, withProps } from "recompose";
import { isNil, omit } from "ramda";

import SplashScreen from "../components/splash-screen";
import { connect } from "react-redux";
import { getAccounts } from "../selectors";

const enhance = compose(
  connect(state => ({
    accounts: getAccounts(state),
  })),
  withProps(({ accounts }) => ({
    shouldRender: isNil(accounts),
  })),
  lifecycle({
    componentDidMount() {
      if (!this.props.shouldRender) {
        this.props.navigation.replace("Home");
      }
    },
    componentDidUpdate(prevProps) {
      const hasDiffProp = prop => this.props[prop] !== prevProps[prop];

      if (hasDiffProp("shouldRender") && !this.props.shouldRender) {
        this.props.navigation.replace("Home");
      }
    },
  }),
  mapProps(omit(["accounts", "shouldRender", "navigation"])),
  pure,
);

export default enhance(SplashScreen);
