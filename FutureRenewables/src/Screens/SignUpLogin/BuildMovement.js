
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import SafeAreaView from 'src/Components/SafeAreaView';
import BackButton from 'src/Components/BackButton';

import {
  sg,
} from 'src/Styles';

import buildMovement from './images/buildMovement.png';
import buildMovementPeople from './images/buildMovementPeople.jpg';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class BuildMovement extends Component {
  render() {
    const { screenProps } = this.props;

    return (
      <Content contentContainerStyle={[sg.flexGrow]} bounces={false}>
        <Image
          source={buildMovement}
          style={sg.postitionAbsoluteRight}
        />

        <SafeAreaView forceInset={{ bottom: 'never' }}>
          <BackButton
            signup
            header={false}
            {...this.props}
          />

          <View style={[sg.spaceBetween, sg.pH20, sg.aICenter]}>
            <Text style={[styles.header, sg.mB10, sg.mT20]}>
              Build the
              {'\n'}
              movement
            </Text>

            <Text style={sg.textCenter}>
              Join the growing movement of people
              {'\n'}
              building a cleaner future for the planet
            </Text>

            <Image
              source={buildMovementPeople}
            />


            <Button
              style={[sg.mH0, sg.mB20, sg.mT20]}
              block
              onPress={() => {
                screenProps.navigateTo(routeNames.SIGN_UP_LOGIN);
              }}
            >
              <Text>Next</Text>
            </Button>
          </View>
        </SafeAreaView>
      </Content>
    );
  }
}

export default connect()(BuildMovement);
