import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './src/components/HomeScreen';
import SignUpOrLoginScreen from './src/components/SignUpOrLoginScreen';
import SmsVerifyScreen from './src/components/SmsVerifyScreen';
import FeedScreen from './src/components/FeedScreen';
import AccountsAndApplicationsScreen from './src/components/AccountsAndApplicationsScreen';
import ApplicationType from './src/components/signup/ApplicationType';
import DateOfBirth from './src/components/signup/DateOfBirth';
import Email from './src/components/signup/Email';
import HomeAddress from './src/components/signup/HomeAddress';
import Name from './src/components/signup/Name';
import SummaryAndConfirm from './src/components/signup/SummaryAndConfirm';


const RootStack = createStackNavigator(
  {
    // WELCOME SCREENS
    Home: { screen: HomeScreen, },
    SignUpOrLogin: { screen: SignUpOrLoginScreen, },
    SmsCode: { screen: SmsVerifyScreen, },

    // LOGGED IN USER SCREENS
    Feed: { screen: FeedScreen, },
    AccountsAndApplications: { screen: AccountsAndApplicationsScreen, },

    // SIGNUP FORM SCREENS
    ApplicationType: { screen: ApplicationType, },
    DateOfBirth: { screen: DateOfBirth, },
    Email: { screen: Email, },
    HomeAddress: { screen: HomeAddress, },
    Name: { screen: Name, },
    SummaryAndConfirm: { screen: SummaryAndConfirm, },
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
