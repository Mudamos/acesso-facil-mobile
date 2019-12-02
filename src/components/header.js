import { DARKER_BLUE, WHITE } from "../constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

const Header = ({
  color,
  title,
  navigation: { canGoBack, goBack },
  onHeaderLeft,
  onHeaderRight,
}) => (
  <View style={[styles.container, color && { backgroundColor: color }]}>
    <TouchableOpacity
      onPress={() => (canGoBack() ? goBack() : onHeaderLeft())}
      style={styles.createAccountContainer}>
      <IonIcons
        name={canGoBack() ? "md-arrow-back" : "md-person-add"}
        size={24}
        color={WHITE}
      />
    </TouchableOpacity>

    {title ? (
      <Text>{title}</Text>
    ) : (
      <AppSimpleLogoImage width={30} height={30} />
    )}

    <TouchableOpacity
      onPress={onHeaderRight}
      style={styles.createAccountContainer}>
      <IonIcons name="md-menu" size={24} color={WHITE} />
    </TouchableOpacity>
  </View>
);

Header.defaultProps = {
  color: null,
  title: null,
};

Header.propTypes = {
  color: PropTypes.string,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    canGoBack: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string,
  onHeaderLeft: PropTypes.func.isRequired,
  onHeaderRight: PropTypes.func.isRequired,
};

export default Header;
