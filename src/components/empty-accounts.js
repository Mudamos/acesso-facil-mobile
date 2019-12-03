import { Dimensions, StyleSheet, View } from "react-native";

import BackgroundRioImage from "../images/background_rio.svg";
import Button from "./base/button";
import ProfileImage from "../images/profile.svg";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  image: {
    marginBottom: 20,
  },
  button: {
    paddingRight: 10,
  },
  background: {
    bottom: -1,
    position: "absolute",
  },
});

const { width: screenWidth } = Dimensions.get("screen");
const backgroundWidth = screenWidth;
const backgroundHeight = Math.ceil(screenWidth * 0.164);

const EmptyAccounts = ({ onCreateAccount }) => (
  <View style={styles.container}>
    <ProfileImage style={styles.image} width={120} height={120} />
    <Button text="CRIAR IDENTIDADE" onPress={onCreateAccount} />
    <BackgroundRioImage
      style={styles.background}
      width={backgroundWidth}
      height={backgroundHeight}
    />
  </View>
);

EmptyAccounts.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
};

export default EmptyAccounts;
