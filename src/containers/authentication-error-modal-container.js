import { compose, pure, withProps } from "recompose";

import Alert from "../components/base/alert";
import Button from "../components/base/button";
import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { dismissNotifyError } from "../actions";
import { getNotifyError } from "../selectors";

const enhance = compose(
  connect(
    state => ({
      notifyError: getNotifyError(state),
    }),
    {
      dismissNotifyError,
    },
  ),
  withProps(({ notifyError, dismissNotifyError }) => ({
    visible: !!notifyError,
    title: "Acesso Fácil",
    content: <Text>{notifyError}</Text>,
    buttonAccept: <Button text="Ok" onPress={dismissNotifyError} />,
  })),
  pure,
);

export default enhance(Alert);
