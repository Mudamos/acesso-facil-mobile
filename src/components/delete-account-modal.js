import { DARK_GRAY, RED } from "../constants";
import { StyleSheet, Text } from "react-native";

import { AccountPrototype } from "../proptypes";
import Alert from "./base/alert";
import Button from "./base/button";
import PropTypes from "prop-types";
import React from "react";
import { prop } from "ramda";

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

const getAccountName = prop("accountName");

const DeleteAccountModal = ({
  accountToDelete,
  abortAccountDelete,
  deleteAccount,
  visible,
}) => (
  <Alert
    visible={!!accountToDelete}
    title="Acesso Fácil"
    content={
      <Text style={styles.contentText}>
        Tem certeza que deseja deletar{" "}
        <Text style={styles.bold}>{getAccountName(accountToDelete)}</Text>?
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
  accountToDelete: AccountPrototype.isRequired,
  abortAccountDelete: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default DeleteAccountModal;
