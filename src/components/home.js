import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import AccountListContainer from "../containers/account-list-container";
import { DARKER_BLUE } from "../constants";
import Header from "./header";
import PropTypes from "prop-types";
import React from "react";
import { identity } from "ramda";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARKER_BLUE },
});

const Home = ({ onCreateAccount, onLogin }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={DARKER_BLUE} barStyle="light-content" />
      <Header
        color={DARKER_BLUE}
        onCreateAccount={onCreateAccount}
        onOpenOptions={identity}
      />
      <AccountListContainer
        onCreateAccount={onCreateAccount}
        onLogin={onLogin}
      />
    </SafeAreaView>
  );
};

Home.defaultProps = {
  title: null,
};

Home.propTypes = {
  title: PropTypes.string,
  onCreateAccount: PropTypes.func.isRequired,
};

export default Home;
