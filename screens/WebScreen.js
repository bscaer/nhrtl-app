import React, { PropTypes } from 'react';
import { View, WebView, StyleSheet, Platform } from "react-native";
import HTMLView from 'react-native-htmlview';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EF",
    flexDirection: "column"
  },
  h1: {
    fontSize: 16 
  },
});

export default class WebScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: ({ title }) =>
      (Platform.OS === 'ios')? 
          <HTMLView style={{width: Layout.window.width-50, height: 10, marginLeft: 12}} stylesheet={styles}
                    value={"<h1>"+(title.slice(0, 32) + (title.length > 32 ? "..." : ""))+"</h1>"}/>:
          (title),
      backgroundColor: ({ color }) => color,
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.props.link }} startInLoadingState={true} />
      </View>
    );
  }
}

WebScreen.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
