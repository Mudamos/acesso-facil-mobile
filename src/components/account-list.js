import { DARKER_BLUE, WHITE } from "../constants";
import { FlatList, StyleSheet, View } from "react-native";

import AccountCard from "./account-card";
import { AccountPrototype } from "../proptypes";
import EmptyAccounts from "./empty-accounts";
import PropTypes from "prop-types";
import React from "react";
import { isEmpty } from "ramda";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: WHITE,
  },
  flatList: {
    marginVertical: 40,
  },
  newAccount: { marginBottom: 16 },
  newAccountText: { fontWeight: "bold" },
  itemSeparator: {
    flex: 1,
    backgroundColor: DARKER_BLUE,
    minWidth: 1,
    minHeight: 1,
  },
  emptyItem: {
    flex: 1,
    padding: 10,
  },
});

const AccountList = ({
  accounts,
  onCreateAccount,
  onDeleteAccount,
  onLogin,
}) => (
  <View style={styles.container}>
    {isEmpty(accounts) && <EmptyAccounts onCreateAccount={onCreateAccount} />}
    {!isEmpty(accounts) && (
      <FlatList
        style={styles.flatList}
        data={accounts}
        showsVerticalScrollIndicator
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item, index }) => (
          <AccountCard
            account={item}
            index={index}
            onChange={onLogin}
            onDelete={() => onDeleteAccount(accounts[index])}
          />
        )}
      />
    )}
  </View>
);

AccountList.defaultProps = {
  accounts: [],
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(AccountPrototype),
  onCreateAccount: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default AccountList;
