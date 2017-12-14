import React, { PropTypes } from 'react';
import { View, WebView, StyleSheet, ActivityIndicator } from "react-native";
import Router from "../navigation/Router";
import HTMLView from 'react-native-htmlview';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EF",
    flexDirection: "column"
  }
});

export default class ArticleScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: ({ title }) =>
      <HTMLView style={{width: Layout.window.width-50, height: 10, marginLeft: 12}} value={title.slice(0, 35) + (title.length > 35 ? "..." : "")}/>,
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

ArticleScreen.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
