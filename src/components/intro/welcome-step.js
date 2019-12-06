import { StyleSheet, Text, View } from "react-native";

import LogoImage from "../../images/app_full_logo.svg";
import LogoSFRJImage from "../../images/logo_rio_sf.svg";
import PropTypes from "prop-types";
import React from "react";
import StepWrapper from "./step-wrapper";

const styles = StyleSheet.create({
  textContainer: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  text: { fontSize: 20 },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 40,
  },
});

const WelcomeStep = ({ nextStep, previousStep }) => (
  <StepWrapper previousStep={previousStep} nextStep={nextStep}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Bem vindo(a) ao</Text>
      <Text style={styles.text}>Acesso Fácil RJ da SEFAZ.</Text>
    </View>
    <View style={styles.imageContainer}>
      <LogoImage width={200} height={200} />
      <LogoSFRJImage width={260} height={80} />
    </View>
  </StepWrapper>
);

StepWrapper.propTypes = {
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
};

StepWrapper.defaultProps = {
  nextStep: null,
  previousStep: null,
};

export default WelcomeStep;
