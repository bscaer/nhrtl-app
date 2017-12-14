import React, { Component } from 'react';
import { Constants, Components } from 'expo';
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

import FadeIn from '@expo/react-native-fade-in-image';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';
import Layout from '../constants/Layout';

import Router from "../navigation/Router";

export default class HomeScreen extends Component {
  static route = { navigationBar: { title: 'Connect' } }

   _pregnancyHelp = async () => {
    this.props.navigator.push(
      Router.getRoute("article", {
        title: "Pregnancy Help",
        // link: 'http://optionline.org'
        link: 'http://nhrtl.org/pregnant/'
      })
    );
  }     

  _facebook = async () => {
    this.props.navigator.push(
      Router.getRoute("article", {
        title: "New Hampshire Right to Life",
        link: 'http://www.facebook.com/nhrtl'
      })
    );
  }    

  _blog = async () => {
    this.props.navigator.push(
      Router.getRoute("articleList", {
        title: "News",
        link: "http://nhrtl.org/wp-json/wp/v2/posts",
        displayPubDate: true
    }));
  }

  _events = async () => {
    this.props.navigator.push(
      Router.getRoute("articleList", {
        title: "Events",
        link: "http://nhrtl.org/wp-json/wp/v2/posts?categories=38",
        displayPubDate: false
    }));
  }

  //   <HomeScreenListItem 
  //       imageUrl={'http://p10cdn4static.sharpschool.com/UserFiles/Servers/Server_191623/File/code/images/icon_calendar.png'}
  //       itemText={'Calendar'}
  //       onPress={this._calendar}/>

  // _calendar = async () => {
  //   this.props.navigator.push(
  //     Router.getRoute("article", {
  //       title: "Calendar",
  //       link: 'http://nhrtl.org/events/'
  //     })
  //   );
  // }  


  _donate = async () => {
    this.props.navigator.push(
      Router.getRoute("article", {
        title: "Donate",
        link: 'http://donate.nhrtl.org/'
      })
    );
  }  

  _subscribe = async () => {
    this.props.navigator.push(
      Router.getRoute("article", {
        title: "Subscribe",
        link: 'http://nhrtl.org/subscribe'
      })
    );
  }  

  render() {
    return (
      <ScrollView>
        <Image style={{width: 300, height:75}} 
          source={{ uri: 'http://nhrtl.org/wp-content/uploads/2014/03/nhrtl-logo-2x.png'}}/>
        <View style={{height:10}}/>

        <HomeScreenListItem 
          imageUrl={'https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/df/d6/a5/dfd6a5b8-ad30-a5f8-346b-fae6dda673da/source/60x60bb.jpg'}
          itemText={'Pregnancy Help'}
          onPress={this._pregnancyHelp}/>

        <HomeScreenListItem 
          imageUrl={'https://cdn4.iconfinder.com/data/icons/social-media-2097/94/facebook-128.png'}
          itemText={'Facebook'}
          onPress={this._facebook}/>
          
        <HomeScreenListItem 
          imageUrl={'https://lh3.googleusercontent.com/Wyi5h62r9j6Dahf7S4Ul4nNLdG87k3m9PSeYcsnnDzLEPB4IxJL-QmRIVXFqkXx7nvE=w300'}
          itemText={'News'}
          onPress={this._blog}/> 

        <HomeScreenListItem 
          imageUrl={'http://p10cdn4static.sharpschool.com/UserFiles/Servers/Server_191623/File/code/images/icon_calendar.png'}
          itemText={'Events'}
          onPress={this._events}/>
          
          <HomeScreenListItem 
          imageUrl={'https://cdn1.iconfinder.com/data/icons/flat-business-finance/256/donate_money_finance_business-128.png'}
          itemText={'Donate'}
          onPress={this._donate}/>

      <HomeScreenListItem 
          imageUrl={'https://cdn0.iconfinder.com/data/icons/social-15/200/mail-icon-128.png'}
          itemText={'Sign Up for Email Alerts'}
          onPress={this._subscribe}/>
      </ScrollView>
    )
  }
}

class HomeScreenListItem extends Component {
  render() {
    return (
        <TouchableNativeFeedback 
          delayPressIn={80}
          onPress={this.props.onPress}
          style={styles.container}
          fallback={TouchableHighlight}
          underlayColor="#DCDCDC"
          activeOpacity={0.7}
          onPress={this.props.onPress}>
        <View style={styles.logoContainer}>
          <FadeIn placeholderStyle={{backgroundColor: Platform.OS === 'android' ? 'transparent' : '#eee'}}>
            <Image
              resizeMode="contain"
              source={{uri: this.props.imageUrl }}
              style={styles.logo}
            />
          </FadeIn>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{fontFamily: 'OpenSans', fontSize: 16}}>
            {this.props.itemText}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
        </View>
        </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width-3,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    paddingRight: 5,
  },
});