import Alert from "./base/alert";
import Button from "./base/button";
import PropTypes from "prop-types";
import React from "react";
import { Text } from "react-native";

const AlertNotificationModal = ({ message, visible, onConfirm }) => {
  return (
    <Alert
      showModal={visible}
      title="Acesso Fácil"
      content={<Text>{message}</Text>}
      buttonAccept={<Button text="Ok" onPress={onConfirm} />}
    />
  );
};

AlertNotificationModal.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

AlertNotificationModal.defaultProps = {
  message: null,
};

export default AlertNotificationModal;
