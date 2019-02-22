
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

import ListLinks from 'src/Components/ListLinks';

class TaxFileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  handlePress() {
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your Tax File Number (TFN)
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Tax File Number"
              textCenter
              autoCorrect={false}
              onChangeText={(value) => { this.setState({ value }); }}
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
            onPress={() => this.handlePress()}
            block
            secondary
            style={styleGlobal.mT10}
          >
            <Text>Add TFN later</Text>
          </Button>

          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>

        <ListLinks
          absolute
          navigateTo={this.props.screenProps.navigateTo}
          data={[
            {
              name: 'Individual or Sole Trader',
              screen: 'FinalConfirmation',
            },
            {
              name: 'Joint',
              screen: 'JointInvestorDetails',
            },
          ]}
        />
      </Content>
    );
  }
}

export default connect()(TaxFileNumber);
