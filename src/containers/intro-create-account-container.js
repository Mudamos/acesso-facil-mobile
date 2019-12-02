import { compose, pure, withHandlers } from "recompose";

import IntroCreateAccount from "../components/intro-create-account";

const enhance = compose(
  withHandlers({
    onContinue: ({ navigation }) => () => {
      navigation.navigate("CreateAccount");
    },
  }),
  pure,
);

export default enhance(IntroCreateAccount);
