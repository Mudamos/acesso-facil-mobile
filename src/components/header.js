import { DARKER_BLUE, WHITE } from "../constants";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppSimpleLogoImage from "../images/app_simple_logo.svg";
import IonIcons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    backgroundColor: DARKER_BLUE,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 60,
    padding: 10,
    paddingHorizontal: 16,
  },
  createAccountContainer: {
    flexBasis: 30,
  },
});

const Header = ({ color, onCreateAccount, onOpenOptions }) => (
  <View style={[styles.container, color && { backgroundColor: color }]}>
    <TouchableOpacity
      onPress={onCreateAccount}
      style={styles.createAccountContainer}>
      <IonIcons name="md-person-add" size={24} color={WHITE} />
    </TouchableOpacity>

    <AppSimpleLogoImage width={30} height={30} />

    <TouchableOpacity
      onPress={onOpenOptions}
      style={styles.createAccountContainer}>
      <IonIcons name="md-menu" size={24} color={WHITE} />
    </TouchableOpacity>
  </View>
);

Header.defaultProps = {
  color: null,
};

Header.propTypes = {
  color: PropTypes.string,
  onCreateAccount: PropTypes.func.isRequired,
  onOpenOptions: PropTypes.func.isRequired,
};

export default Header;
