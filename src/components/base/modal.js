import { StyleSheet, View, ViewPropTypes } from "react-native";

import PropTypes from "prop-types";
import React from "react";
import { WHITE } from "../../constants";

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

class Modal extends React.Component {
  render() {
    const { backgroundStyle, children, style, visible } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <View style={[styles.modalBackground, backgroundStyle]}>
        <View style={[styles.modalContainer, style]}>{children}</View>
      </View>
    );
  }
}

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
