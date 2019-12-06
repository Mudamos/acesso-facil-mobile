import { StyleSheet, View } from "react-native";

import AuthenticationErrorModalContainer from "../containers/authentication-error-modal-container";
import Header from "./header";
import QRCodeScannerContainer from "../containers/qrcode-scanner-container";
import React from "react";
import { WHITE } from "../constants";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
});

const QRCodeCreateAccount = () => {
  return (
    <View style={styles.container}>
      <Header />
      <QRCodeScannerContainer permissionDialogMessage="Para a criação da identidade é necessário escanear o QRCode através da camera do seu dispositivo" />
      <AuthenticationErrorModalContainer />
    </View>
  );
};

export default QRCodeCreateAccount;
