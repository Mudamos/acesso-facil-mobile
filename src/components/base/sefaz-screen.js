import { DARKER_BLUE, WHITE } from "../../constants";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import BackgroundRioImage from "../../images/background_rio.svg";
import DeleteAccountModalContainer from "../../containers/delete-account-modal-container";
import Header from "../header";
import PropTypes from "prop-types";
import React from "react";

const { width: screenWidth } = Dimensions.get("screen");
const backgroundWidth = screenWidth + 2;
const backgroundHeight = Math.ceil(screenWidth * 0.164);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    marginBottom: backgroundHeight,
  },
  background: {
    bottom: -1,
    left: -1,
    position: "absolute",
  },
});

const SefazScreen = ({
  children,
  onHeaderLeft,
  onHeaderRight,
  title,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={DARKER_BLUE} barStyle="light-content" />
      <Header
        color={DARKER_BLUE}
        title={title}
        onHeaderLeft={onHeaderLeft}
        onHeaderRight={onHeaderRight}
      />
      <View style={styles.content}>{children}</View>
      <BackgroundRioImage
        style={styles.background}
        width={backgroundWidth}
        height={backgroundHeight}
      />
      <DeleteAccountModalContainer />
    </SafeAreaView>
  );
};

SefazScreen.propTypes = {
  children: PropTypes.node.isRequired,
  onHeaderLeft: PropTypes.func,
  onHeaderRight: PropTypes.func,
  title: PropTypes.string,
};

SefazScreen.defaultProps = {
  onHeaderLeft: null,
  onHeaderRight: null,
  title: null,
};

export default SefazScreen;
