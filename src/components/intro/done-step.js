import { StyleSheet, Text, View } from "react-native";

import PropTypes from "prop-types";
import React from "react";
import ScanQrcodeSuccessImage from "../../images/scan_qrcode_success.svg";
import StepWrapper from "./step-wrapper";

const styles = StyleSheet.create({
  textContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  text: { fontSize: 16, textAlign: "center" },
  bold: { fontWeight: "bold" },
  imageContainer: { flex: 3, alignItems: "center", paddingTop: 40 },
});

const DoneStep = ({ previousStep, nextStep }) => (
  <StepWrapper previousStep={previousStep} nextStep={nextStep}>
    <View style={styles.textContainer}>
      <Text style={[styles.text, styles.bold]}>Pronto!</Text>
      <Text style={styles.text}>Seu login foi autenticado com sucesso.</Text>
    </View>
    <View style={styles.imageContainer}>
      <ScanQrcodeSuccessImage width={200} height={360} />
    </View>
  </StepWrapper>
);

DoneStep.propTypes = {
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
};

DoneStep.defaultProps = {
  nextStep: null,
  previousStep: null,
};

export default DoneStep;
