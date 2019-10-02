import { StyleSheet, View } from "react-native";

import LoaderModal from "./loader-modal";
import PropTypes from "prop-types";
import QRCodeMask from "./qrcode-mask";
import QRCodeNotAuthorized from "./qrcode-not-authorized";
import QRCodeScanner from "react-native-qrcode-scanner";
import React from "react";

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  qrcodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const QRCodeLogin = ({
  hasSuccessOnQrcodeScan,
  onQrcodeScan,
  scannerError,
  isScanning,
  loadingMessage,
}) => {
  const shouldRenderCamera =
    !isScanning && !hasSuccessOnQrcodeScan && !scannerError;

  return (
    <View style={styles.container}>
      {shouldRenderCamera && (
        <QRCodeScanner
          onRead={content => onQrcodeScan({ content: content.data })}
          showMarker
          customMarker={<QRCodeMask />}
          containerStyle={styles.qrcodeContainer}
          cameraStyle={styles.qrcodeCamera}
          notAuthorizedView={<QRCodeNotAuthorized />}
          pendingAuthorizationView={<View />}
          cameraProps={{
            ratio: "1:1",
            notAuthorizedView: <QRCodeNotAuthorized />,
          }}
          checkAndroid6Permissions
          permissionDialogTitle="Por que precisamos do acesso a camera?"
          permissionDialogMessage="Para conceder o acesso à SEFAZ é necessário escanear o QRCode através da camera do seu dispositivo"
        />
      )}
      <LoaderModal visible={isScanning} message={loadingMessage} />
    </View>
  );
};

QRCodeLogin.defaultProps = {
  loadingMessage: null,
};

QRCodeLogin.proptypes = {
  hasSuccessOnQrcodeScan: PropTypes.bool.isRequired,
  isScanning: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  onQrcodeScan: PropTypes.func.isRequired,
};

export default QRCodeLogin;
