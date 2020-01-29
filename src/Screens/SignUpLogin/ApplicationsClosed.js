
import React, { Component } from 'react';

import {
  View,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import { routeNames } from 'src/Navigation';

import { sg } from 'src/Styles';

import { applicationsClosed as styles } from './styles';

class ApplicationsClosed extends Component {
  onNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.ACCOUNTS);
  }

  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={styles.header}>Applications currenly closed</Text>

            <Text style={styles.descriptionP}>
              We&apos;re expectiong to start accepting new applications through Array again soon.
            </Text>
          </View>
          <View>
            <Button onPress={() => this.onNext()} block>
              <Text>Next</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

export default ApplicationsClosed;
