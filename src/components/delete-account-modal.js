import { DARK_GRAY, RED } from "../constants";
import { StyleSheet, Text } from "react-native";

import Alert from "./base/alert";
import Button from "./base/button";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  contentText: {
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonAccept: {
    backgroundColor: RED,
  },
  buttonDecline: {
    backgroundColor: DARK_GRAY,
  },
});

const DeleteAccountModal = ({
  abortAccountDelete,
  accountToDelete: { accountName },
  deleteAccount,
  visible,
}) => (
  <Alert
    showModal={visible}
    title="Acesso Fácil"
    content={
      <Text style={styles.contentText}>
        Tem certeza que deseja deletar{" "}
        <Text style={styles.bold}>{accountName}</Text>?
      </Text>
    }
    buttonAccept={
      <Button
        text="Sim"
        onPress={deleteAccount}
        style={[styles.button, styles.buttonAccept]}
      />
    }
    buttonDecline={
      <Button
        text="Não"
        onPress={abortAccountDelete}
        style={[styles.button, styles.buttonDecline]}
      />
    }
  />
);

DeleteAccountModal.propTypes = {
  abortAccountDelete: PropTypes.func.isRequired,
  accountToDelete: PropTypes.shape({ accountName: PropTypes.string }),
  deleteAccount: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

DeleteAccountModal.defaultProps = {
  accountToDelete: {},
};

export default DeleteAccountModal;
