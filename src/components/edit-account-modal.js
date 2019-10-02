import { DARK_GRAY, WHITE } from "../constants";
import { StyleSheet, Text, TextInput } from "react-native";

import Button from "./base/button";
import Modal from "./base/modal";
import PropTypes from "prop-types";
import React from "react";
import { SefazAccountPrototype } from "../proptypes";
import { isEmpty } from "ramda";

const styles = StyleSheet.create({
  accountNameText: {
    marginBottom: 10,
  },
  accountNameInput: {
    height: 40,
    width: 260,
    borderColor: DARK_GRAY,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: WHITE,
    fontWeight: "700",
  },
});

const EditAccountModal = ({
  account,
  createAccount,
  visible,
  customName,
  setCustomName,
}) => (
  <Modal visible={visible}>
    <Text style={styles.accountNameText}>
      Escolha um nome para sua identidade
    </Text>
    <TextInput
      style={styles.accountNameInput}
      onChangeText={setCustomName}
      autoCapitalize="words"
      value={customName}
      maxLength={50}
      onSubmitEditing={() =>
        !isEmpty(customName) &&
        createAccount({ ...account, accountName: customName })
      }
      placeholder="Digite um nome para a identidade"
    />
    <Button
      text="Salvar"
      disabled={isEmpty(customName)}
      onPress={() => createAccount({ ...account, accountName: customName })}
    />
  </Modal>
);

EditAccountModal.propTypes = {
  account: SefazAccountPrototype.isRequired,
  createAccount: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  customName: PropTypes.string.isRequired,
  setCustomName: PropTypes.func.isRequired,
};

export default EditAccountModal;
