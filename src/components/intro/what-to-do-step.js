import { StyleSheet, Text, View } from "react-native";

import PropTypes from "prop-types";
import React from "react";
import ScanQrcodeImage from "../../images/scan_qrcode.svg";
import StepWrapper from "./step-wrapper";

const styles = StyleSheet.create({
  textContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  text: { fontSize: 16, textAlign: "center" },
  imageContainer: { flex: 3, alignItems: "center", paddingTop: 80 },
});

const WhatToDoStep = ({ previousStep, nextStep }) => (
  <StepWrapper previousStep={previousStep} nextStep={nextStep}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        Após completar os passos indicados no portal SEFAZ você receberá um QR
        Code que deve ser autenticado pelo app.
      </Text>
    </View>
    <View style={styles.imageContainer}>
      <ScanQrcodeImage width={180} height={320} />
    </View>
  </StepWrapper>
);

WhatToDoStep.propTypes = {
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
};

WhatToDoStep.defaultProps = {
  nextStep: null,
  previousStep: null,
};

export default WhatToDoStep;
