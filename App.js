import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/Navigations/AppNavigation';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  return (
     <AppContainer />
  );
  
}
AppRegistry.registerComponent('main', () => App);




