import { StyleSheet, View } from "react-native";

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
});

const EmptyAccounts = ({ onCreateAccount }) => (
  <View style={styles.container}>
    <ProfileImage style={styles.image} width={120} height={120} />
    <Button text="CRIAR IDENTIDADE" onPress={onCreateAccount} />
  </View>
);

EmptyAccounts.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
};

export default EmptyAccounts;
