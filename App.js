
import React, { Component } from 'react';
import { Expo, Constants, Components, AppLoading, Font } from 'expo';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation';

import {
  FontAwesome,
  MaterialIcons
} from '@expo/vector-icons';

import Router from "./navigation/Router";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});

export default class App extends Component {

state = {
    assetsReady: false,
    dataReady: false,
  };

  async componentDidMount() {
    await this._loadAssetsAsync();
  }
  
    _loadAssetsAsync = async () => {
    await Font.loadAsync({
      ...MaterialIcons.font,
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Semibold.ttf'),
    });

    this.setState({
      assetsReady: true,
    });
  }
  
  render() {

    if (!this.state.assetsReady) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
          <StackNavigation 
              initialRoute={Router.getRoute('home')} />
        </NavigationProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" &&
        <View style={styles.statusBarUnderlay} />}
      </View>);
  }
}


