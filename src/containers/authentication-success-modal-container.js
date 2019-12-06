import { compose, pure, withProps } from "recompose";

import Alert from "../components/base/alert";
import Button from "../components/base/button";
import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { dismissNotifySuccess } from "../actions";
import { getNotifySuccess } from "../selectors";

const enhance = compose(
  connect(
    state => ({
      notifySuccess: getNotifySuccess(state),
    }),
    {
      dismissNotifySuccess,
    },
  ),
  withProps(({ notifySuccess, dismissNotifySuccess }) => ({
    visible: !!notifySuccess,
    title: "Acesso Fácil",
    content: <Text>{notifySuccess}</Text>,
    buttonAccept: <Button text="Ok" onPress={dismissNotifySuccess} />,
  })),
  pure,
);

export default enhance(Alert);
