import { DARK_GRAY, GRAY } from "../constants";
import { FlatList, StyleSheet, View } from "react-native";

import AccountCard from "./account-card";
import { AccountPrototype } from "../proptypes";
import EmptyAccounts from "./empty-accounts";
import PropTypes from "prop-types";
import React from "react";
import { isEmpty } from "ramda";

const styles = StyleSheet.create({
  container: { flex: 2, backgroundColor: GRAY },
  newAccount: { marginBottom: 16 },
  newAccountText: { fontWeight: "bold" },
  itemSeparator: {
    flex: 1,
    backgroundColor: DARK_GRAY,
    minWidth: 1,
    minHeight: 1,
  },
  columnWrapper: {
    flex: 1,
  },
  emptyItem: {
    flex: 1,
    padding: 10,
  },
});

const AccountList = ({
  accounts,
  changeCurrentAccount,
  onCreateAccount,
  onDeleteAccount,
}) => (
  <View style={styles.container}>
    {isEmpty(accounts) && <EmptyAccounts onCreateAccount={onCreateAccount} />}
    {!isEmpty(accounts) && (
      <FlatList
        data={accounts}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <AccountCard
            account={item}
            index={index}
            onChange={changeCurrentAccount}
            onDelete={() => onDeleteAccount({ id: item.id, name: item.name })}
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
  changeCurrentAccount: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
};

export default AccountList;
