import { DARK_BLUE, WHITE } from "../constants";
import { StyleSheet, Text, View } from "react-native";

import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_BLUE,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 40, color: WHITE, fontWeight: "700" },
});

const SplashScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Acesso Fácil</Text>
  </View>
);

export default SplashScreen;
