/**
 * @providesModule ArticleListScreen
 */
'use strict';

import React, { PropTypes, Component } from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

import FadeIn from '@expo/react-native-fade-in-image';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';
import HTMLView from 'react-native-htmlview';
import Layout from '../constants/Layout';

import LoadingContainer from '../components/LoadingContainer';
import fetchWithTimeout from '../components/fetchWithTimeout'

import Router from "../navigation/Router";

const styles = StyleSheet.create({
   list: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F0F0F0'
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 0,
    paddingRight: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 15,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0E0E0',
    width: Layout.window.width-35,
  },
  h1: {
    fontWeight: 'bold', 
    fontFamily: 'OpenSans', 
    fontSize: 18, 
    color: '#484848'
  },
  h2: {
    fontFamily: 'OpenSans', 
    fontSize: 16, 
    color: '#484848'
  }
});

export default class ArticleListScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: ({ title }) => <Text>{title}</Text>,
      backgroundColor: ({ color }) => color
    }
  };

  constructor(props) {
    super(props);

    this._loadInitialDataAsync = this._loadInitialDataAsync.bind(this);
    this._onReadyAsync = this._onReadyAsync.bind(this);
    this._renderRow = this._renderRow.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { dataSource: ds.cloneWithRows(['Empty']) };
  }

  render() {
    return (
      <LoadingContainer
        onLoadStartAsync={this._loadInitialDataAsync}
        onReadyAsync={this._onReadyAsync}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow} />
      </LoadingContainer>
    );
  }

  async _loadInitialDataAsync() {
    let response = await fetchWithTimeout(this.props.link);
    
    return response.json();
  }

  async _onReadyAsync(data) {

    var length = data.length;
    var titles = [];
    var anItem;
    var i;

    for (i = 0; i < length; i++) {
        anItem = data[i];
        titles.push(
          {
            title: anItem.title.rendered,
            link: anItem.link,
            pubDate: anItem.date,
            description: anItem.excerpt.rendered.replace("<\/p>\n", "")
          });
    }

    let dataSource = this.state.dataSource.cloneWithRows(titles);

    return new Promise((resolve) => {
      this.setState({dataSource}, resolve);
    });
  }

  _openPage = ({ title, link, pubDate, description }) => {
    this.props.navigator.push(
      Router.getRoute("article", {
        title,
        link,
        pubDate,
        description
      })
    );
  };

  _renderRow(rowData) {
    return (
        <ArticleScreenListItem 
          itemText={rowData.title}
          pubDate={new Date(rowData.pubDate).toLocaleDateString()}
          displayPubDate={this.props.displayPubDate}
          description={rowData.description}
          onPress={() => this._openPage(rowData)}/>
    );
  }
};

        /*<View>
          <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
        </View>*/

class ArticleScreenListItem extends Component {
  render() {
    return (
        <TouchableNativeFeedback 
            delayPressIn={80}
            style={styles.infoContainer}
            fallback={TouchableHighlight}
            underlayColor='#DCDCDC'
            activeOpacity={0.7}
            onPress={this.props.onPress}>
        <View>
          <Text style={{fontFamily: 'OpenSans', fontSize: 10, color: '#909090'}}>
              {this.props.pubDate}
          </Text> 
          <HTMLView value={"<h1>"+this.props.itemText+"</h1>"} stylesheet={styles}/>
          <HTMLView value={"<h2>"+this.props.description+"</h2>"}  stylesheet={styles}/>
        </View>
        </TouchableNativeFeedback>
    );
  }
}

ArticleListScreen.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};





















