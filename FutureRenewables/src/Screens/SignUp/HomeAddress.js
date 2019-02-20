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
  Item,
  Input,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import styles from './styles';

class HomeAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('InitialInvestmentAmount');
  }

  onChangeInput(e) {
    this.setState({
      value: e,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addAddressManually() {
    alert('ok');
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your Home Address
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e); }}
              value={this.state.value}
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

export default connect()(HomeAddress);
