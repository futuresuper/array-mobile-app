
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import constants from './constants';

class EntityContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress() {
    const { screenProps, navigation } = this.props;
    const type = navigation.getParam('type');

    if (type === constants.COMPANY) {
      screenProps.navigateTo('CompanyDirectors');
    } else if (type === 'partnership') {
      screenProps.navigateTo('EntityAddress');
    }
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          EntityContactDetails
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(EntityContactDetails);
