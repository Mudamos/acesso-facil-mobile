import AccountListContainer from "../containers/account-list-container";
import PropTypes from "prop-types";
import React from "react";
import SefazScreen from "./base/sefaz-screen";

const Home = ({ onCreateAccount, onLogin, navigation }) => {
  return (
    <SefazScreen
      onHeaderLeft={onCreateAccount}
      navigation={navigation}>
      <AccountListContainer
        onCreateAccount={onCreateAccount}
        onLogin={onLogin}
      />
    </SefazScreen>
  );
};

Home.defaultProps = {
  title: null,
};

Home.propTypes = {
  navigation: PropTypes.shape({
    canGoBack: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string,
  onCreateAccount: PropTypes.func.isRequired,
};

export default Home;
