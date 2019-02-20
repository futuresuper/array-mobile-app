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

class DateOfBirth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitted: false,
      errors: '',
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('HomeAddress');
  }

  // eslint-disable-next-line class-methods-use-this
  addItemEvery(strInp, item, every) {
    let str = strInp;

    for (let i = 0; i < str.length; i += 1) {
      if (!(i % (every + 1))) {
        str = str.substring(0, i) + item + str.substring(i);
      }
    }

    return str.substring(1);
  }

  onChangeInput(e) {
    let value = e.replace(/\/+/g, '');
    const firstFourChars = this.addItemEvery(value.substring(0, 5), '/', 2);
    value = firstFourChars + value.substring(5, value.length);

    this.setState({
      value,
    });
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Date of Birth
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              keyboardType="numeric"
              placeholder="DD/MM/YYYY"
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
};


export default connect()(DateOfBirth);
