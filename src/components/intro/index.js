import { BLUE, WHITE } from "../../constants";

import AppIntroSlider from "react-native-app-intro-slider";
import DoneStep from "./done-step";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import WelcomeStep from "./welcome-step";
import WhatToDoStep from "./what-to-do-step";

const styles = StyleSheet.create({
  slider: { backgroundColor: WHITE, flex: 1 },
  dotStyle: {
    marginHorizontal: 10,
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BLUE,
  },
});

const slides = [
  {
    key: "welcome",
    component: ({ goToSlide }) => <WelcomeStep nextStep={() => goToSlide(1)} />,
  },
  {
    key: "what-to-do",
    component: ({ goToSlide }) => (
      <WhatToDoStep
        previousStep={() => goToSlide(0)}
        nextStep={() => goToSlide(2)}
      />
    ),
  },
  {
    key: "done",
    component: ({ goToSlide, onFinish }) => (
      <DoneStep previousStep={() => goToSlide(1)} nextStep={() => onFinish()} />
    ),
  },
];

const Intro = ({ onFinish }) => {
  const appIntroSliderRef = React.createRef();
  const goToSlide = index => appIntroSliderRef.current.goToSlide(index);

  return (
    <AppIntroSlider
      style={styles.slider}
      renderItem={({ item }) => item.component({ goToSlide, onFinish })}
      slides={slides}
      ref={this.appIntroSliderRef}
      showNextButton={false}
      dotStyle={styles.dotStyle}
      activeDotStyle={[styles.dotStyle, { backgroundColor: BLUE }]}
    />
  );
};

Intro.proptypes = {
  onFinish: PropTypes.func.isRequired,
};

export default Intro;
