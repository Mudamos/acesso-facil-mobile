import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";

import LoaderModal from "./loader-modal";
import PropTypes from "prop-types";
import QRCodeMask from "../images/qrcode_mask.svg";
import QRCodeNotAuthorized from "./qrcode-not-authorized";
import ReactNativeQRCodeScanner from "react-native-qrcode-scanner";
import { WHITE } from "../constants";
import { useNavigation } from "@react-navigation/core";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1 },
  qrcodeContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  qrcodeCamera: { flex: 1, paddingBottom: 120 },
  messageContaner: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    bottom: height / 12,
    width: 220,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  message: { color: WHITE, textAlign: "center", fontSize: 18 },
});

const QRCodeScanner = ({
  isScanning,
  loadingMessage,
  notifySuccess,
  onQrcodeScan,
  permissionDialogMessage,
  permissionDialogTitle,
  shouldRenderCamera,
}) => {
  const navigation = useNavigation();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isFocusedScreen, setFocusedScreen] = useState(true);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () =>
      setFocusedScreen(true),
    );
    const unsubscribeBlur = navigation.addListener("blur", () =>
      setFocusedScreen(false),
    );

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, []);

  return (
    <Fragment>
      <View style={styles.container}>
        {shouldRenderCamera && isFocusedScreen && (
          <ReactNativeQRCodeScanner
            onRead={content => onQrcodeScan({ content: content.data })}
            showMarker
            customMarker={<QRCodeMask width={200} height={200} />}
            containerStyle={styles.qrcodeContainer}
            cameraStyle={styles.qrcodeCamera}
            notAuthorizedView={<QRCodeNotAuthorized />}
            pendingAuthorizationView={<View />}
            cameraProps={{
              onCameraReady: () => setCameraEnabled(true),
              notAuthorizedView: <QRCodeNotAuthorized />,
            }}
            permissionDialogTitle={permissionDialogTitle}
            permissionDialogMessage={permissionDialogMessage}
          />
        )}
        {cameraEnabled && (
          <View style={styles.messageContaner}>
            <Text style={styles.message}>
              Posicione o QRCode na área indicada
            </Text>
          </View>
        )}
      </View>
      <LoaderModal
        visible={isScanning || !!notifySuccess}
        message={loadingMessage}
      />
    </Fragment>
  );
};

QRCodeScanner.proptypes = {
  isScanning: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  notifySuccess: PropTypes.string,
  onQrcodeScan: PropTypes.func.isRequired,
  permissionDialogMessage: PropTypes.string,
  permissionDialogTitle: PropTypes.string,
  shouldRenderCamera: PropTypes.bool.isRequired,
};

QRCodeScanner.defaultProps = {
  loadingMessage: null,
  notifySuccess: null,
  permissionDialogMessage:
    "Para conceder o acesso à SEFAZ é necessário escanear o QRCode através da camera do seu dispositivo",
  permissionDialogTitle: "Por que precisamos do acesso a camera?",
};

export default QRCodeScanner;
