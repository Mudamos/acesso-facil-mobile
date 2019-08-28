/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import { storeBuilder } from './src/store';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

const { store, run } = storeBuilder();
run();

AppRegistry.registerComponent(appName, () => App(store));
