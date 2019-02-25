
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

import styles from './styles';

class EntityAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChangeInput(e) {
    this.setState({
      value: e,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addAddressManually() {
  }

  handlePress() {
    const { screenProps, navigation } = this.props;
    const type = navigation.getParam('type');
    screenProps.navigateTo('EntityOverseasTaxStatus', { type });
  }

  render() {
    const { value } = this.state;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Company Registered Address
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e); }}
              value={value}
            />
          </Item>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>

          <Button
            onPress={() => this.addAddressManually()}
            transparent
            block
          >
            <Text style={styles.addAddressManually}>Add address manually</Text>
          </Button>

          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(EntityAddress);
