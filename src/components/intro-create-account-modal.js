import { StyleSheet, Text, View } from "react-native";

import Button from "./base/button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import React from "react";
import { WHITE } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: WHITE,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageQRCode: {
    position: "absolute",
    top: 20,
    bottom: 0,
    right: 0,
    left: 22,
  },
  buttonIcon: {
    paddingRight: 10,
  },
});

const IntroCreateAccountModal = ({ onPress }) => (
  <View style={styles.container}>
    <Text style={styles.title}>
      Para criar sua identidade, escaneie o QRCode do portal da SEFAZ
    </Text>
    <View style={styles.imageContainer}>
      <MaterialCommunityIcons
        name="monitor-cellphone"
        size={80}
        color={WHITE}
      />
      <View style={styles.imageQRCode}>
        <MaterialCommunityIcons name="qrcode" size={30} color={WHITE} />
      </View>
    </View>
    <Button
      text="Escanear QRCode"
      icon={
        <MaterialCommunityIcons
          style={styles.buttonIcon}
          name="camera"
          size={20}
          color={WHITE}
        />
      }
      onPress={onPress}
    />
  </View>
);

IntroCreateAccountModal.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default IntroCreateAccountModal;
