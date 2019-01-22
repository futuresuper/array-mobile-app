import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './src/components/HomeScreen';
import SignUpOrLoginScreen from './src/components/SignUpOrLoginScreen';
import SmsVerifyScreen from './src/components/SmsVerifyScreen';
import FeedScreen from './src/components/FeedScreen';
import AccountsAndApplicationsScreen from './src/components/AccountsAndApplicationsScreen';
import ApplicationType from './src/components/signup/ApplicationType';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    SignUpOrLogin: {
      screen: SignUpOrLoginScreen,
    },
    SmsCode: {
      screen: SmsVerifyScreen,
    },
    Feed: {
      screen: FeedScreen,
    },
    AccountsAndApplications: {
      screen: AccountsAndApplicationsScreen,
    },
    ApplicationType: {
      screen: ApplicationType,
    },
  },
  {
    initialRouteName: 'ApplicationType',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
