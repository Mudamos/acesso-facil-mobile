import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BLUE } from "../constants";
import LogoSFRJImage from "../images/logo_rio_sf.svg";
import PropTypes from "prop-types";
import React from "react";
import SefazScreen from "./base/sefaz-screen";
import SpeakerIconImage from "../images/speaker-icon.svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 40,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: BLUE,
    textDecorationLine: "underline",
  },
});

const Faq = ({
  onPhonePress,
  onPortalPress,
  phoneNumberFormatted,
  portalUrlFormatted,
}) => (
  <SefazScreen>
    <View style={styles.container}>
      <View style={styles.header}>
        <SpeakerIconImage width={80} height={80} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Acesse o portal de dúvidas frequentes através do link:
        </Text>
        <TouchableOpacity onPress={onPortalPress}>
          <Text style={[styles.text, styles.link]}>{portalUrlFormatted}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Ou entre em contato com a Secretaria da Fazenda do Estado do Rio de
          Janeiro através do telefone
        </Text>
        <TouchableOpacity onPress={onPhonePress}>
          <Text style={[styles.text, styles.link]}>{phoneNumberFormatted}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <LogoSFRJImage width={260} height={80} />
      </View>
    </View>
  </SefazScreen>
);

Faq.propTypes = {
  onPhonePress: PropTypes.func.isRequired,
  onPortalPress: PropTypes.func.isRequired,
  phoneNumberFormatted: PropTypes.string.isRequired,
  portalUrlFormatted: PropTypes.string.isRequired,
};

export default Faq;
