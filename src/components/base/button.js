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
    borderColor: GRAY,
    borderRadius: 6,
    borderWidth: 0.5,
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

const Button = ({ disabled, icon, onPress, style, text, textStyle }) => {
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

Button.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  text: PropTypes.string.isRequired,
  textStyle: ViewPropTypes.style,
};

Button.defaultProps = {
  disabled: false,
  icon: null,
  style: {},
  textStyle: {},
};

export default Button;
