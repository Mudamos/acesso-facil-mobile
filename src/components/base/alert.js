import { StyleSheet, Text, View } from "react-native";

import Modal from "./modal";
import PropTypes from "prop-types";
import React from "react";
import { omit } from "ramda";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    maxWidth: 300,
  },
  title: {
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 300,
    marginTop: 20,
  },
});

const ButtonContainer = ({ primary, secondary }) => (
  <View style={styles.buttonContainer}>
    {secondary}
    {primary}
  </View>
);

const Alert = ({ title, content, buttonAccept, buttonDecline, ...props }) => (
  <Modal {...props} style={[styles.container, props.style]}>
    <Text style={styles.title}>{title}</Text>
    {content}
    <ButtonContainer primary={buttonAccept} secondary={buttonDecline} />
  </Modal>
);

Alert.propTypes = {
  ...omit(["children"], Modal.propTypes),
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  buttonAccept: PropTypes.node.isRequired,
  buttonDecline: PropTypes.node,
};

Alert.defaultProps = {
  buttonDecline: null,
};

export default Alert;
