import { StyleSheet, Text, View } from "react-native";

import AppFullLogoImage from "../images/app_full_logo.svg";
import { DARK_GRAY } from "../constants";
import DeviceInfo from "react-native-device-info";
import LogoSFRJImage from "../images/logo_rio_sf.svg";
import React from "react";
import SefazScreen from "./base/sefaz-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  version: {
    marginTop: -16,
    color: DARK_GRAY,
    fontSize: 10,
  },
});

const About = () => (
  <SefazScreen>
    <View style={styles.container}>
      <View style={styles.header}>
        <AppFullLogoImage width={140} height={160} />
        <Text style={styles.version}>
          Versão {DeviceInfo.getReadableVersion()}
        </Text>
      </View>
      <View style={styles.content}>
        <Text>
        O aplicativo Acesso Fácil é uma ferramenta que visa viabilizar a autenticação da identidade do usuário na plataforma de serviços digitais da Secretaria de Estado de Fazenda do Rio de Janeiro, garantindo a verificação de identidade na plataforma SSA (Sistema de Segurança de Acesso) por meio de criptografia assimétrica.
Importante mencionar que não existe informação sensível a ser transitada, nem armazenamento de dados pessoais na plataforma do Acesso Fácil.
        </Text>
      </View>
      <View style={styles.footer}>
        <LogoSFRJImage width={260} height={80} />
      </View>
    </View>
  </SefazScreen>
);

export default About;
