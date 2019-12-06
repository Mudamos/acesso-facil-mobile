import { DARKER_BLUE, DARK_GRAY, WHITE } from "../constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AccountPrototype } from "../proptypes";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  accountContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 18,
  },
  text: {
    fontSize: 18,
    color: DARKER_BLUE,
  },
  excludeText: {
    fontSize: 10,
    color: DARK_GRAY,
  },
  deleteContainer: {
    justifyContent: "center",
  },
});

const AccountCard = ({ account, onChange, onDelete }) => (
  <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.accountContainer}
      onPress={() => onChange(account.id)}
      onLongPress={() => onDelete()}>
      <Text style={styles.text} numberOfLines={1}>
        {account.accountName}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDelete()} style={styles.deleteContainer}>
      <Text style={styles.excludeText}>EXCLUIR</Text>
    </TouchableOpacity>
  </View>
);

AccountCard.propTypes = {
  account: AccountPrototype.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AccountCard;
