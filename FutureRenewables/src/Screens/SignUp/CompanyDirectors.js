
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

class CompanyDirectors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
      },
    };
  }

  handlePress() {
    const { screenProps } = this.props;
    screenProps.navigateTo('EntityAddress', { type: 'company' });
  }

  render() {
    const { value } = this.state;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Company Directors
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder=""
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.setState({ value: e }); }}
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
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(CompanyDirectors);
