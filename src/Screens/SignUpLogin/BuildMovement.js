
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
  state = {
    multiplier: 1,
  };


  onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    let multiplier = 1;

    if (height < 600) {
      multiplier = 0.7;
    } else if (height < 670) {
      multiplier = 0.9;
    }

    this.setState({
      multiplier,
    });
  }

  render() {
    const { screenProps } = this.props;
    const { multiplier } = this.state;
    const centerImage = (multiplier < 0.9);

    return (
      <Content contentContainerStyle={[sg.flexGrow]} bounces={false} onLayout={this.onLayout}>
        <Image
          source={buildMovement}
          style={sg.postitionAbsoluteRight}
        />

        <SafeAreaView forceInset={{ bottom: 'never' }} theme={screenProps.getTheme()}>
          <BackButton
            signup
            header={false}
            {...this.props}
          />

          <View style={[sg.spaceBetween, sg.pH0]}>
            <View>
              <Text style={[styles.header, sg.mB10, sg.mT60]}>
                {'Build the\nmovement'}
              </Text>
              <Text style={sg.textCenter}>
                {'Join the growing movement of people\nbuilding a cleaner future for the planet'}
              </Text>
            </View>
            <Image
              source={buildMovementPeople}
              style={[centerImage ? {} : sg.mL20, { width: 416 * multiplier, height: 349 * multiplier, alignSelf: (centerImage ? 'center' : undefined) }]}
            />
            <Button
              style={[sg.contentMargin, sg.mT0]}
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
