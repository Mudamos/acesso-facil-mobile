import { StyleSheet, Text, View } from "react-native";

import AppFullLogoImage from "../images/app_full_logo.svg";
import { DARK_GRAY } from "../constants";
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
        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>
      <View style={styles.content}>
        <Text>
          There are many variations of passages of Lorem Ipsum available, but
          theses majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
          It uses a dictionary of over 200 Latin words, combined with a handful
          of model sentence structures, to generate Lorem Ipsum which looks
          reasonable.
        </Text>
      </View>
      <View style={styles.footer}>
        <LogoSFRJImage width={260} height={80} />
      </View>
    </View>
  </SefazScreen>
);

export default About;
