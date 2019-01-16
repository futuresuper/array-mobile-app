import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './src/components/HomeScreen';
import SignUpScreen from './src/components/SignUpScreen';
import LoginScreen from './src/components/LoginScreen';
import SmsVerifyScreen from './src/components/SmsVerifyScreen';
import FeedScreen from './src/components/FeedScreen';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    SmsCode: {
      screen: SmsVerifyScreen,
    },
    Feed: {
      screen: FeedScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
