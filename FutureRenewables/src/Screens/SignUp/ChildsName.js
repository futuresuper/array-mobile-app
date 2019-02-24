
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

class ChildsName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        childFirstName: '',
        childLastName: '',
      },
    };
  }

  onChangeInput(e, inputKey) {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [inputKey]: e,
      },
    });
  }

  handlePress() {
    const { screenProps } = this.props;
    screenProps.navigateTo('AdultForChildAppType');
  }

  render() {
    const { form } = this.state;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Adult for Child application
          </Text>

          <Text style={[styleGlobal.textDescription, styleGlobal.mB20]}>
            Fore these applications, we&apos;ll note the child&apos;s name on most of the communications you receive,
            however the adult who signs up for the account is the account owner.
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Child's First Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'childFirstName'); }}
              value={form.childFirstName}
            />
          </Item>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Child's Last Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'childLastName'); }}
              value={form.childLastName}
            />
          </Item>

          <Text style={[styleGlobal.textDescription, styleGlobal.mT20]}>
            For the rest of this application, please enter your own details (not your child&apos;s)
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

export default connect()(ChildsName);
