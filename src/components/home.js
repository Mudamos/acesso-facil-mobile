import {
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import AccountListContainer from "../containers/account-list-container";
import Button from "./base/button";
import { DARK_BLUE } from "../constants";
import DebugModalContainer from "../containers/debug-modal-container";
import Header from "./header";
import PropTypes from "prop-types";
import QRCodeLoginContainer from "../containers/qrcode-login-container";
import { isDebug } from "../utils";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK_BLUE },
});

const Home = ({ title, hasCurrentAccount, onCreateAccount }) => {
  const [anim] = useState(new Animated.Value(0));
  const [isDebugModalVisible, setDebugModalVisible] = useState(false);

  if (hasCurrentAccount) {
    Animated.timing(anim, {
      toValue: 1,
    }).start();
  } else {
    Animated.timing(anim, {
      toValue: 0,
    }).start();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={DARK_BLUE} barStyle="light-content" />
      <Header text={title} onCreateAccount={onCreateAccount} />
      <Animated.View
        style={{
          flexBasis: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get("window").width],
          }),
        }}>
        {hasCurrentAccount && <QRCodeLoginContainer />}
      </Animated.View>
      <AccountListContainer onCreateAccount={onCreateAccount} />
      {isDebug && (<Button text="Debug" onPress={() => setDebugModalVisible(true)} />)}
      {isDebug && (<DebugModalContainer visible={isDebugModalVisible} onClose={() => setDebugModalVisible(false)} />)}
    </SafeAreaView>
  );
};

Home.defaultProps = {
  title: null,
};

Home.propTypes = {
  title: PropTypes.string,
  hasCurrentAccount: PropTypes.bool.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

export default Home;
