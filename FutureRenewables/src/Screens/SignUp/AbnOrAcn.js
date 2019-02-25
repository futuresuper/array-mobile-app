
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
import constants from './constants';

class AbnOrAcn extends React.Component {
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
    const { screenProps } = this.props;
    const { value } = this.state;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          ABN or ACN
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="ABN or ACN"
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
            <Text>Search</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>

        <ListLinks
          absolute
          navigateTo={screenProps.navigateTo}
          data={[
            {
              name: 'Sole Trader',
              screen: 'SoleTraderConfirmation',
            },
            {
              name: 'Company',
              screen: 'EntityContactDetails',
              params: { type: constants.COMPANY },
            },
            {
              name: 'Partnership',
              screen: 'EntityContactDetails',
              params: { type: constants.PARTNERSHIP },
            },
          ]}
        />
      </Content>
    );
  }
}

export default connect()(AbnOrAcn);
