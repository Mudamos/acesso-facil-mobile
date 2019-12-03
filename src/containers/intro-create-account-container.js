import { compose, pure, withHandlers } from "recompose";

import IntroCreateAccount from "../components/intro-create-account";
import { SCREENS } from "../models";

const enhance = compose(
  withHandlers({
    onContinue: ({ navigation }) => () => {
      navigation.navigate(SCREENS.CREATE_ACCOUNT);
    },
  }),
  pure,
);

export default enhance(IntroCreateAccount);
