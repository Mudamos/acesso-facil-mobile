import { BLACK, DARKER_BLUE, WHITE } from "../../constants";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";

import BackgroundRioImage from "../../images/background_rio.svg";
import DeleteAccountModalContainer from "../../containers/delete-account-modal-container";
import Header from "../header";
import PropTypes from "prop-types";
import Sidebar from "../sidebar";
import { isFunction } from "../../utils";
import { pure } from "recompose";
import { useNavigation } from "@react-navigation/core";

const { width: screenWidth } = Dimensions.get("screen");
const backgroundWidth = screenWidth + 2;
const backgroundHeight = Math.ceil(screenWidth * 0.164);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: {
    flex: 1,
  },
  top: {
    backgroundColor: DARKER_BLUE,
  },
  bottom: {
    backgroundColor: BLACK,
  },
  contentWithBackground: {
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
  showBackground,
  title,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener("blur", () =>
      setShowSidebar(false),
    );

    return unsubscribeBlur;
  }, [navigation]);

  return (
    <Fragment>
      <SafeAreaView style={styles.top} />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={DARKER_BLUE} barStyle="light-content" />
        <Header
          title={title}
          onHeaderLeft={onHeaderLeft}
          onHeaderRight={() => {
            setShowSidebar(!showSidebar);
            isFunction(onHeaderRight) && onHeaderRight();
          }}
        />
        <View
          style={[
            styles.content,
            showBackground && styles.contentWithBackground,
          ]}>
          {children}
        </View>
        {showBackground && (
          <BackgroundRioImage
            style={styles.background}
            width={backgroundWidth}
            height={backgroundHeight}
          />
        )}
        <Sidebar
          visible={showSidebar}
          onDismiss={() => setShowSidebar(false)}
        />
        <DeleteAccountModalContainer />
      </SafeAreaView>
      <SafeAreaView style={styles.bottom} />
    </Fragment>
  );
};

SefazScreen.propTypes = {
  children: PropTypes.node.isRequired,
  onHeaderLeft: PropTypes.func,
  onHeaderRight: PropTypes.func,
  showBackground: PropTypes.bool,
  title: PropTypes.string,
};

SefazScreen.defaultProps = {
  onHeaderLeft: null,
  onHeaderRight: null,
  showBackground: true,
  title: null,
};

export default pure(SefazScreen);
