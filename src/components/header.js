import { DARK_BLUE, WHITE } from "../constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import IonIcons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_BLUE,
    maxHeight: 60,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: WHITE,
    fontWeight: "700",
  },
  createAccountContainer: {
    flexBasis: 30,
  },
});

const Header = ({ text, onCreateAccount }) => (
  <View style={styles.container}>
    <Text numberOfLines={1} style={styles.text}>
      {text}
    </Text>
    <TouchableOpacity
      onPress={onCreateAccount}
      style={styles.createAccountContainer}>
      <IonIcons name="md-person-add" size={30} color={WHITE} />
    </TouchableOpacity>
  </View>
);

Header.defaultProps = {
  text: null,
};

Header.propTypes = {
  text: PropTypes.string,
  onCreateAccount: PropTypes.func.isRequired,
};

export default Header;
