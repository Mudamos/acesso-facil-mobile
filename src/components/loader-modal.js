import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { BLACK, DARK_BLUE } from "../constants";

import Modal from "./base/modal";
import PropTypes from "prop-types";
import React from "react";
import { pure } from "recompose";

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    color: BLACK,
  },
});

const LoaderModal = ({ visible, message }) => (
  <Modal visible={visible}>
    <ActivityIndicator animating={!!visible} size="large" color={DARK_BLUE} />
    {message && <Text style={styles.text}>{message}</Text>}
  </Modal>
);

LoaderModal.defaultProps = {
  message: null,
};

LoaderModal.propTypes = {
  message: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

export default pure(LoaderModal);
