import { Text, TouchableHighlight, View } from "react-native";
import { accountLogin, createAccount, fetchAccounts } from "../actions";

import Config from "react-native-config";
import React from "react";
import { connect } from "react-redux";
import { head } from "ramda";

const enhance = connect(
  state => ({
    accountTest: head(state.accounts.data),
  }),
  { createAccount, fetchAccounts, accountLogin },
);

const Test = ({ accountLogin, accountTest, createAccount, fetchAccounts }) => (
  <View>
    <TouchableHighlight onPress={() => createAccount({ accountName: "Jonas" })}>
      <Text>Create account! {Config.API_URL}</Text>
    </TouchableHighlight>

    <TouchableHighlight onPress={fetchAccounts}>
      <Text>Fetch accounts</Text>
    </TouchableHighlight>

    {accountTest && (
      <TouchableHighlight
        onPress={() =>
          accountLogin({
            id: accountTest.id,
            contentEncoded: "eyJhY2NvdW50TmFtZSI6IkpvbmFzIn0=",
          })
        }>
        <Text>Login</Text>
      </TouchableHighlight>
    )}
  </View>
);

export default enhance(Test);
