
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

class InitialInvestmentAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('RegularInvestmentAmount');
  }

  onChangeInput(e) {
    this.setState({
      value: e,
    });
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Initial Investment Amount
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              keyboardType="numeric"
              placeholder="Investment Amount"
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
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(InitialInvestmentAmount);
