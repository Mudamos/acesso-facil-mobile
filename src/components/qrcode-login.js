import { AccountPrototype } from "../proptypes";
import AuthenticationErrorModalContainer from "../containers/authentication-error-modal-container";
import QRCodeScannerContainer from "../containers/qrcode-scanner-container";
import React from "react";
import SefazScreen from "./base/sefaz-screen";

const QRCodeLogin = ({ currentAccount: { accountName } }) => {
  return (
    <SefazScreen title={accountName} showBackground={false}>
      <QRCodeScannerContainer />
      <AuthenticationErrorModalContainer />
    </SefazScreen>
  );
};

QRCodeLogin.proptypes = {
  currentAccount: AccountPrototype.isRequired,
};

export default QRCodeLogin;
