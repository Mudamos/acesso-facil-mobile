import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {connect, Provider} from 'react-redux';
import {createAccount} from '../actions';

const enhance = connect(
  null,
  {createAccount},
);

const Test = ({ createAccount }) => (
  <TouchableHighlight
    onPress={() => createAccount({accountName: 'Jonas'})}>
    <Text>Create account!</Text>
  </TouchableHighlight>
);

export default enhance(Test);
