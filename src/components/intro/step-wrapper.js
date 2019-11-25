import { StyleSheet, TouchableOpacity, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { BLUE } from "../../constants";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  alignEnd: { alignItems: "flex-end" },
  alignStart: { alignItems: "flex-start" },
  childrenContainer: { flex: 1 },
  container: { flex: 1, flexDirection: "row" },
  controlContainer: { flex: 0, flexBasis: 38, justifyContent: "center" },
});

const StepWrapper = ({ children, previousStep, nextStep }) => (
  <View style={styles.container}>
    <View style={[styles.controlContainer, styles.alignEnd]}>
      {previousStep && (
        <TouchableOpacity onPress={previousStep}>
          <AntDesign name="left" size={30} color={BLUE} />
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.childrenContainer}>{children}</View>
    <View style={[styles.controlContainer, styles.alignStart]}>
      {nextStep && (
        <TouchableOpacity onPress={nextStep}>
          <AntDesign name="right" size={30} color={BLUE} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

StepWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
};

StepWrapper.defaultProps = {
  nextStep: null,
  previousStep: null,
};

export default StepWrapper;
