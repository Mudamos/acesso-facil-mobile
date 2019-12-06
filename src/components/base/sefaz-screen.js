import { DARKER_BLUE, WHITE } from "../../constants";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import BackgroundRioImage from "../../images/background_rio.svg";
import DeleteAccountModalContainer from "../../containers/delete-account-modal-container";
import Header from "../header";
import PropTypes from "prop-types";
import Sidebar from "../sidebar";
import { pure } from "recompose";
import { useNavigation } from "@react-navigation/core";

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

const SefazScreen = ({ children, onHeaderLeft, onHeaderRight, title }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener("blur", () =>
      setShowSidebar(false),
    );

    return unsubscribeBlur;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={DARKER_BLUE} barStyle="light-content" />
      <Header
        title={title}
        onHeaderLeft={onHeaderLeft}
        onHeaderRight={() => {
          setShowSidebar(!showSidebar);
          onHeaderRight();
        }}
      />
      <View style={styles.content}>{children}</View>
      <BackgroundRioImage
        style={styles.background}
        width={backgroundWidth}
        height={backgroundHeight}
      />
      <Sidebar visible={showSidebar} onDismiss={() => setShowSidebar(false)} />
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

export default pure(SefazScreen);
