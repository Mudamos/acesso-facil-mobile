import { BLACK, WHITE } from "../constants";
import { StyleSheet, Text, View } from "react-native";

import Button from "./base/button";
import Entypo from "react-native-vector-icons/Entypo";
import IonIcons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: BLACK,
  },
  image: {
    marginBottom: 20,
  },
  button: {
    paddingRight: 10,
  },
});

const EmptyAccounts = ({ onCreateAccount }) => (
  <View style={styles.container}>
    <Text style={styles.title}>
      Nenhuma identidade vinculada à esse dispositivo
    </Text>
    <Entypo
      style={styles.image}
      name="tablet-mobile-combo"
      size={80}
      color={BLACK}
    />
    <Button
      text="Criar identidade"
      icon={
        <IonIcons
          style={styles.button}
          name="md-person-add"
          size={20}
          color={WHITE}
        />
      }
      onPress={onCreateAccount}
    />
  </View>
);

EmptyAccounts.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
};

export default EmptyAccounts;
