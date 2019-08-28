import { Provider, connect } from "react-redux";
import React, { Fragment } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

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
