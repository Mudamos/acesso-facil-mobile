import AuthenticationErrorModalContainer from "../containers/authentication-error-modal-container";
import QRCodeScannerContainer from "../containers/qrcode-scanner-container";
import React from "react";
import SefazScreen from "./base/sefaz-screen";

const QRCodeCreateAccount = () => {
  return (
    <SefazScreen showBackground={false}>
      <QRCodeScannerContainer permissionDialogMessage="Para a criação da identidade é necessário escanear o QRCode através da camera do seu dispositivo" />
      <AuthenticationErrorModalContainer />
    </SefazScreen>
  );
};

export default QRCodeCreateAccount;
