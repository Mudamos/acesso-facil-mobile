import { BLACK, WHITE } from "../constants";
import { Linking, StyleSheet, Text, View } from "react-native";

import Button from "../components/base/button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    color: BLACK,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    color: BLACK,
    textAlign: "center",
  },
  buttonIcon: {
    paddingRight: 10,
  },
});

const QRCodeNotAuthorized = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons name="camera-off" size={30} color={BLACK} />
    <Text style={styles.title}>Permissão de acesso à camera negada</Text>
    <Text style={styles.description}>
      Para escanear o QRCode habilite o acesso nas configurações de seu
      dispositivo
    </Text>
    <Button
      text="Ir para configurações"
      icon={
        <MaterialCommunityIcons
          style={styles.buttonIcon}
          name="settings"
          size={20}
          color={WHITE}
        />
      }
      onPress={Linking.openSettings}
    />
  </View>
);

export default QRCodeNotAuthorized;
