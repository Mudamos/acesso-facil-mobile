import { Text, TouchableHighlight } from "react-native";

import React from "react";
import { connect } from "react-redux";
import { createAccount } from "../actions";

const enhance = connect(
  null,
  { createAccount },
);

const Test = ({ createAccount }) => (
  <TouchableHighlight onPress={() => createAccount({ accountName: "Jonas" })}>
    <Text>Create account!</Text>
  </TouchableHighlight>
);

export default enhance(Test);
