import React, { Fragment } from "react";

import AccountListContainer from "../containers/account-list-container";
import AuthenticationSuccessModalContainer from "../containers/authentication-success-modal-container";
import PropTypes from "prop-types";
import SefazScreen from "./base/sefaz-screen";

const Home = ({ onCreateAccount, onLogin }) => {
  return (
    <Fragment>
      <SefazScreen onHeaderLeft={onCreateAccount}>
        <AccountListContainer
          onCreateAccount={onCreateAccount}
          onLogin={onLogin}
        />
      </SefazScreen>
      <AuthenticationSuccessModalContainer />
    </Fragment>
  );
};

Home.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Home;
