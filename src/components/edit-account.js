import { BLACK, LIGHT_GRAY, WHITE } from "../constants";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { isEmpty, isNil } from "ramda";

import AuthenticationErrorModalContainer from "../containers/authentication-error-modal-container";
import Button from "./base/button";
import LoaderModal from "./loader-modal";
import PropTypes from "prop-types";
import { SefazAccountPrototype } from "../proptypes";
import SefazScreen from "./base/sefaz-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: LIGHT_GRAY,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
  },
  accountNameText: {
    marginBottom: 10,
  },
  accountNameInput: {
    height: 40,
    width: 260,
    borderColor: BLACK,
    backgroundColor: WHITE,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: WHITE,
    fontWeight: "700",
  },
});

const EditAccount = ({ account, loadingMessage, notifySuccess, onSubmit }) => {
  const [customName, setCustomName] = useState(account.accountName);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardOpen(true),
    );
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <Fragment>
      <SefazScreen showBackground={!isKeyboardOpen}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.accountNameText}>
              Escolha um nome para sua identidade
            </Text>
            <TextInput
              style={styles.accountNameInput}
              onChangeText={setCustomName}
              autoCapitalize="words"
              value={customName}
              maxLength={50}
              onSubmitEditing={() => {
                if (!isEmpty(customName)) {
                  Keyboard.dismiss();
                  onSubmit({ ...account, accountName: customName });
                }
              }}
              placeholder="Digite um nome para a identidade"
            />
            <Button
              text="Salvar"
              disabled={isEmpty(customName) || isNil(customName)}
              onPress={() => {
                Keyboard.dismiss();
                onSubmit({ ...account, accountName: customName });
              }}
            />
          </View>
        </View>
      </SefazScreen>
      <AuthenticationErrorModalContainer />
      <LoaderModal
        visible={!!loadingMessage || !!notifySuccess}
        message={loadingMessage}
      />
    </Fragment>
  );
};

EditAccount.propTypes = {
  account: SefazAccountPrototype.isRequired,
  loadingMessage: PropTypes.string,
  notifySuccess: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

EditAccount.defaultProps = {
  loadingMessage: null,
  notifySuccess: null,
};

export default EditAccount;
