import { StyleSheet, Text, View } from "react-native";

import Button from "./base/button";
import PropTypes from "prop-types";
import React from "react";
import ScanQrCodeExampleImage from "../images/scan_qrcode_example.svg";
import SefazScreen from "./base/sefaz-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 60,
  },
});

const IntroCreateAccount = ({ onContinue }) => {
  return (
    <SefazScreen>
      <View style={styles.container}>
        <ScanQrCodeExampleImage width={160} height={160} />
        <Text style={styles.text}>
          Para criar sua conta escaneie o QRCode no portal da SEFAZ
        </Text>
        <Button text="ESCANEAR QRCODE" onPress={onContinue} />
      </View>
    </SefazScreen>
  );
};

IntroCreateAccount.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

export default IntroCreateAccount;
