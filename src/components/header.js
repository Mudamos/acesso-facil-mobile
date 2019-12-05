import { DARKER_BLUE, WHITE } from "../constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AppSimpleLogoImage from "../images/app_simple_logo.svg";
import IonIcons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { isFunction } from "../utils";
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    backgroundColor: DARKER_BLUE,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 60,
    padding: 10,
    paddingHorizontal: 16,
  },
  actionContainer: {
    flexBasis: 30,
  },
});

const Header = ({
  color,
  title,
  onHeaderLeft,
  onHeaderRight,
}) => {
  const [showBackButton, setShowBackButton] = useState(false);
  const { pop, dangerouslyGetState } = useNavigation();
  const showHeaderLeft = isFunction(onHeaderLeft);
  const showHeaderRight = isFunction(onHeaderRight);
  const currentRouteIndex = dangerouslyGetState().index;

  useEffect(() => {
    setShowBackButton(currentRouteIndex !== 0);
  }, []);

  return (
    <View style={[styles.container, color && { backgroundColor: color }]}>
      <View style={styles.actionContainer}>
        {showHeaderLeft && (
          <TouchableOpacity
            onPress={() => (showBackButton ? pop() : onHeaderLeft())}>
            <IonIcons
              name={showBackButton ? "md-arrow-back" : "md-person-add"}
              size={24}
              color={WHITE}
            />
          </TouchableOpacity>
        )}
      </View>

      {title ? (
        <Text>{title}</Text>
      ) : (
        <AppSimpleLogoImage width={30} height={30} />
      )}

      <View style={styles.actionContainer}>
        {showHeaderRight && (
          <TouchableOpacity
            onPress={onHeaderRight}>
            <IonIcons name="md-menu" size={24} color={WHITE} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

Header.defaultProps = {
  color: null,
  title: null,
  onHeaderLeft: null,
  onHeaderRight: null,
};

Header.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  onHeaderLeft: PropTypes.func,
  onHeaderRight: PropTypes.func,
};

export default Header;
