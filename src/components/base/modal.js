import { Dimensions, StyleSheet, View, ViewPropTypes } from "react-native";

import { HEADER_HEIGHT } from "../header";
import PropTypes from "prop-types";
import React from "react";
import { WHITE } from "../../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: -HEADER_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    padding: 20,
    backgroundColor: WHITE,
    borderRadius: 4,
  },
});

const Modal = ({ backgroundStyle, children, showModal, style }) =>
  showModal && (
    <View style={[styles.modalBackground, backgroundStyle]}>
      <View style={[styles.modalContainer, style]}>{children}</View>
    </View>
  );

Modal.propTypes = {
  backgroundStyle: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool,
  style: ViewPropTypes.style,
};

Modal.defaultProps = {
  backgroundStyle: {},
  showModal: false,
  style: {},
};

export default Modal;
