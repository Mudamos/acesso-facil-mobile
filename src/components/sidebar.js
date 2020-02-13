import { BLACK, DARKER_BLUE, LIGHT_GRAY, WHITE } from "../constants";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Config from "react-native-config";
import { HEADER_HEIGHT } from "./header";
import PropTypes from "prop-types";
import React from "react";
import { SCREENS } from "../models";
import { pure } from "recompose";
import { useNavigation } from "@react-navigation/core";

const items = [
  {
    id: "1",
    title: "SOBRE",
    destination: SCREENS.ABOUT,
  },
  {
    id: "2",
    title: "DÚVIDAS FREQUENTES",
    destination: SCREENS.FAQ,
  },
  {
    id: "3",
    title: "PRIMEIROS PASSOS",
    destination: SCREENS.APP_INTRO,
  },
  {
    id: "4",
    title: "POLÍTICA DE PRIVACIDADE",
    link: Config.SEFAZ_PRIVACY_POLICY,
  },
];

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: HEADER_HEIGHT,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: "row",
  },
  background: {
    backgroundColor: BLACK,
    opacity: 0.5,
    flex: 1,
  },
  flatList: {
    backgroundColor: DARKER_BLUE,
    flexBasis: 150,
  },
  itemSeparator: {
    flex: 1,
    minHeight: 1,
    backgroundColor: WHITE,
  },
  itemSeparatorSlim: {
    flex: 1,
    minHeight: 0.5,
    backgroundColor: LIGHT_GRAY,
  },
  itemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  itemText: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 14,
  },
});

const SidebarItem = ({ item }) => {
  const { push } = useNavigation();
  const action = () =>
    item.link
      ? Linking.canOpenURL(item.link).then(
          isSupported => isSupported && Linking.openURL(item.link),
        )
      : push(item.destination);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={action}>
      <Text numberOfLines={1} style={styles.itemText}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const Sidebar = ({ onDismiss }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.background}
      onPress={onDismiss}
      activeOpacity={0}
    />
    <FlatList
      ListHeaderComponent={() => <View style={styles.itemSeparatorSlim} />}
      style={styles.flatList}
      data={items}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      renderItem={props => <SidebarItem {...props} />}
    />
  </View>
);

Sidebar.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default pure(Sidebar);
