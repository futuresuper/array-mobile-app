
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import Br from 'src/Components/Br';
import {
  sg,
} from 'src/Styles';

class ScreensList extends Component {
  renderButton(name, routeName = null) {
    const { screenProps } = this.props;

    return (
      <Button
        onPress={() => {
          screenProps.navigateTo(routeName);
        }}
        block
        bordered={!routeName}
        style={sg.mT10}
      >
        <Text>{name}</Text>
      </Button>
    );
  }

  render() {
    return (
      <Content padder>
        {this.renderButton('Your account', routeNames.APPLICATION_TYPE)}

        <Br width={10} style={sg.pB10} />

        {this.renderButton('Get Started', routeNames.SIGN_UP_LOGIN)}
        {this.renderButton('Verify', routeNames.SMS_CODE)}
        {this.renderButton('Your name', routeNames.NAME)}
        {this.renderButton('Email', routeNames.EMAIL)}
        {this.renderButton('Date of birth', routeNames.DATE_OF_BIRTH)}
        {this.renderButton('Home address', routeNames.HOME_ADDRESS)}
        {this.renderButton('Initial investment', routeNames.INITIAL_INVESTMENT_AMOUNT)}
        {this.renderButton('Regular investment', routeNames.REGULAR_INVESTMENT_AMOUNT)}
        {this.renderButton('Link bank account', routeNames.BANK_ACCOUNT)}
        {this.renderButton('Founds source', routeNames.SOURCE_OF_FUNDS)}

      </Content>
    );
  }
}

export default connect()(ScreensList);
