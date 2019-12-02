import { DARK_BLUE, GRAY, LIGHT_GRAY, WHITE } from "../../constants";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";

import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_BLUE,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  disabledText: {
    color: GRAY,
  },
  text: {
    fontSize: 18,
    color: WHITE,
    fontWeight: "700",
  },
});

const Button = ({ text, icon, textStyle, style, disabled, onPress }) => {
  if (disabled) {
    return (
      <View style={[styles.disabled, style]}>
        {icon}
        <Text style={[styles.text, styles.disabledText, textStyle]}>
          {text}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, style]}
      onPress={onPress}>
      {icon}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  style: {},
  disabled: false,
  icon: null,
  textStyle: {},
};

Button.propTypes = {
  style: ViewPropTypes.style,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: ViewPropTypes.style,
};

export default Button;
