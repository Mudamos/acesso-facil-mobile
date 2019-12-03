import AccountListContainer from "../containers/account-list-container";
import PropTypes from "prop-types";
import React from "react";
import SefazScreen from "./base/sefaz-screen";

const Home = ({ onCreateAccount, onLogin }) => {
  return (
    <SefazScreen
      onHeaderLeft={onCreateAccount}>
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
  title: PropTypes.string,
  onCreateAccount: PropTypes.func.isRequired,
};

export default Home;
