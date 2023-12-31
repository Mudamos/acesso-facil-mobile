import { DARKER_BLUE, WHITE } from "../constants";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AppSimpleLogoImage from "../images/app_simple_logo.svg";
import IonIcons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { isFunction } from "../utils";
import { propOr } from "ramda";
import { pure } from "recompose";
import { useNavigation } from "@react-navigation/core";

export const HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: DARKER_BLUE,
    flexDirection: "row",
    justifyContent: "space-between",
    flexBasis: HEADER_HEIGHT,
    padding: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    color: WHITE,
  },
  actionContainer: {
    flexBasis: 30,
  },
});

const Header = ({ title, onHeaderLeft, onHeaderRight }) => {
  const { pop, dangerouslyGetState } = useNavigation();
  const currentRouteIndex = propOr(0, "index", dangerouslyGetState());
  const [isRootRoute] = useState(currentRouteIndex === 0);
  const showHeaderLeft = isFunction(onHeaderLeft) || !isRootRoute;
  const showHeaderRight = isFunction(onHeaderRight);

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        {showHeaderLeft && (
          <TouchableOpacity
            onPress={() => (isRootRoute ? onHeaderLeft() : pop())}>
            <IonIcons
              name={isRootRoute ? "md-person-add" : "md-arrow-back"}
              size={24}
              color={WHITE}
            />
          </TouchableOpacity>
        )}
      </View>

      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <AppSimpleLogoImage width={30} height={30} />
      )}

      <View style={styles.actionContainer}>
        {showHeaderRight && isRootRoute && (
          <TouchableOpacity onPress={onHeaderRight}>
            <IonIcons name="md-menu" size={24} color={WHITE} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

Header.defaultProps = {
  title: null,
  onHeaderLeft: null,
  onHeaderRight: null,
};

Header.propTypes = {
  title: PropTypes.string,
  onHeaderLeft: PropTypes.func,
  onHeaderRight: PropTypes.func,
};

export default pure(Header);
