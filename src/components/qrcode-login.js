import { StyleSheet, View } from "react-native";

import { AccountPrototype } from "../proptypes";
import AuthenticationErrorModalContainer from "../containers/authentication-error-modal-container";
import Header from "./header";
import QRCodeScannerContainer from "../containers/qrcode-scanner-container";
import React from "react";
import { WHITE } from "../constants";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
});

const QRCodeLogin = ({ currentAccount: { accountName } }) => {
  return (
    <View style={styles.container}>
      <Header title={accountName} />
      <QRCodeScannerContainer />
      <AuthenticationErrorModalContainer />
    </View>
  );
};

QRCodeLogin.proptypes = {
  currentAccount: AccountPrototype.isRequired,
};

export default QRCodeLogin;
