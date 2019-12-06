import { Dimensions, StyleSheet, View, ViewPropTypes } from "react-native";

import PropTypes from "prop-types";
import React from "react";
import { WHITE } from "../../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
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

const Modal = ({ backgroundStyle, children, style, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.modalBackground, backgroundStyle]}>
      <View style={[styles.modalContainer, style]}>{children}</View>
    </View>
  );
};

Modal.propTypes = {
  backgroundStyle: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  backgroundStyle: {},
  style: {},
  visible: false,
};

export default Modal;
