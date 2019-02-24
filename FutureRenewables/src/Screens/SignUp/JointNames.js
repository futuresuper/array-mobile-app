
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

class JointNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        yourFirstName: '',
        yourLastName: '',
        otherInvestorFirstName: '',
        otherInvestorLastName: '',
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
    screenProps.navigateTo('Email');
  }

  render() {
    const { form } = this.state;

    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          Joint Account - Your Names
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Your First Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'yourFirstName'); }}
              value={form.yourFirstName}
            />
          </Item>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Your Last Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'yourLastName'); }}
              value={form.yourLastName}
            />
          </Item>

          <Item regular error={false} marginBottom style={styleGlobal.mT20}>
            <Input
              returnKeyType="next"
              placeholder="Other Investor First Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'otherInvestorFirstName'); }}
              value={form.otherInvestorFirstName}
            />
          </Item>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Other Investor Last Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'otherInvestorLastName'); }}
              value={form.otherInvestorLastName}
            />
          </Item>

          <Button
            onPress={() => this.handlePress()}
            block
            style={styleGlobal.mT20}
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(JointNames);
