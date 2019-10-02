import { DARK_GRAY, WHITE } from "../constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AccountPrototype } from "../proptypes";
import AntDesign from "react-native-vector-icons/AntDesign";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    justifyContent: "center",
    flex: 0.5,
  },
  withBorder: {
    borderLeftWidth: 1,
    borderLeftColor: DARK_GRAY,
  },
  accountContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: DARK_GRAY,
  },
  wrapper: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
  },
  deleteContainer: {
    justifyContent: "center",
  },
});

const isOdd = value => value % 2 === 1;

const AccountCard = ({ account, index, onChange, onDelete }) => (
  <View style={[styles.container, isOdd(index) && styles.withBorder]}>
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.accountContainer}
        onPress={() => onChange(account.id)}
        onLongPress={() => onDelete()}>
        <Text style={styles.text} numberOfLines={2}>
          {account.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete()}
        style={styles.deleteContainer}>
        <AntDesign name="delete" size={16} color={DARK_GRAY} />
      </TouchableOpacity>
    </View>
  </View>
);

AccountCard.propTypes = {
  index: PropTypes.number.isRequired,
  account: AccountPrototype.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AccountCard;
