
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Content,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import constants from './constants';

class EntityTaxFileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tfn: {
          value: '',
        },
      },
    };
  }

  onChangeInput(e, inputKey) {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [inputKey]: {
          ...form[inputKey],
          value: e,
        },
      },
    });
  }

  handlePress() {
    const { screenProps, navigation } = this.props;
    const type = navigation.getParam('type');

    if (type === constants.COMPANY) {
      screenProps.navigateTo('BeneficialOwners');
    } else {
      screenProps.navigateTo('Partners');
    }
  }

  render() {
    const { form } = this.state;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Company Tax File Number (TFN)
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Company Tax File Number"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'tfn'); }}
              value={form.tfn.value}
            />
          </Item>
        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
            marginVert
          >
            <Text>Next</Text>
          </Button>
          <Button
            onPress={() => this.handlePress()}
            block
            secondary
          >
            <Text>Add TFN later</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(EntityTaxFileNumber);
