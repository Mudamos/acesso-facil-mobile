import { DARK_BLUE, WHITE } from "../constants";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import EditAccountModalContainer from "../containers/edit-account-modal-container";
import IonIcons from "react-native-vector-icons/Ionicons";
import LoaderModal from "./loader-modal";
import PropTypes from "prop-types";
import QRCodeMask from "./qrcode-mask";
import QRCodeNotAuthorized from "./qrcode-not-authorized";
import QRCodeScanner from "react-native-qrcode-scanner";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK_BLUE },
  qrcodeWrapper: { flex: 1 },
  qrcodeContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  qrcodeCamera: { flex: 1 },
  backButton: {
    position: "absolute",
    top: height / 14,
    left: width / 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  messageContaner: {
    position: "absolute",
    bottom: height / 12,
    right: 0,
    left: 0,
  },
  message: { color: WHITE, textAlign: "center" },
});

const QRCodeCreateAccount = ({
  hasSuccessOnQrcodeScan,
  isScanning,
  isWaitingForName,
  loadingMessage,
  onBack,
  onQrcodeScan,
  scannerError,
}) => {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const shouldRenderCamera =
    !isScanning &&
    !isWaitingForName &&
    !hasSuccessOnQrcodeScan &&
    !scannerError;

  return (
    <View style={styles.container}>
      {shouldRenderCamera && (
        <View style={styles.qrcodeWrapper}>
          <QRCodeScanner
            onRead={content => onQrcodeScan({ content: content.data })}
            showMarker
            customMarker={<QRCodeMask />}
            containerStyle={styles.qrcodeContainer}
            cameraStyle={styles.qrcodeCamera}
            notAuthorizedView={<QRCodeNotAuthorized />}
            pendingAuthorizationView={<View />}
            cameraProps={{
              onCameraReady: () => setCameraEnabled(true),
              notAuthorizedView: <QRCodeNotAuthorized />,
            }}
            checkAndroid6Permissions
            permissionDialogTitle="Por que precisamos do acesso a camera?"
            permissionDialogMessage="Para a criação da identidade é necessário escanear o QRCode através da camera do seu dispositivo"
          />
          {cameraEnabled && (
            <View style={styles.messageContaner}>
              <Text style={styles.message}>
                Posicione o QRCode na área indicada
              </Text>
            </View>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <IonIcons name="md-arrow-round-back" size={30} color={WHITE} />
      </TouchableOpacity>
      <LoaderModal message={loadingMessage} visible={isScanning} />
      <EditAccountModalContainer visible={isWaitingForName} />
    </View>
  );
};

QRCodeCreateAccount.defaultProps = {
  loadingMessage: null,
};

QRCodeCreateAccount.proptypes = {
  hasSuccessOnQrcodeScan: PropTypes.bool.isRequired,
  isScanning: PropTypes.bool.isRequired,
  isWaitingForName: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onQrcodeScan: PropTypes.func.isRequired,
};

export default QRCodeCreateAccount;
