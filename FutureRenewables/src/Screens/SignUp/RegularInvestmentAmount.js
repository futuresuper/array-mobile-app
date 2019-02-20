
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
  Segment,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import styles from './styles';

class RegularInvestmentAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('BankAccount');
  }

  // eslint-disable-next-line class-methods-use-this
  noRegularInvestment() {
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
            Regular Investment Amount
          </Text>

          <Text style={[styleGlobal.textCenter, styleGlobal.colorGray]}>
            Set up an automatic direct debit into your account, from your bank account
          </Text>

          <Segment style={styles.segment}>
              <Button first active style={[styles.segmentButton, styles.segmentButtonActive]}>
                <Text style={styles.segmentButtonTextActive} >Weekly</Text>
              </Button>
              <Button active style={styles.segmentButton}>
                <Text>Fortnightly</Text>
              </Button>
              <Button last active style={styles.segmentButton}>
                <Text>Monthly</Text>
              </Button>
          </Segment>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Regular Investment Amount"
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
            onPress={() => this.noRegularInvestment()}
            block
            secondary
            style={styleGlobal.mT10}
          >
            <Text>No Regular Investment</Text>
          </Button>

          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(RegularInvestmentAmount);
