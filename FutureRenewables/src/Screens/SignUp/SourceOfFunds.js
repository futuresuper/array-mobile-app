
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import {
  styleGlobal,
} from 'src/Styles';

class SourceOfFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress(type) {
    const { screenProps } = this.props;
    screenProps.navigateTo('PurposeOfInvestment', { type });
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
            Which of these best describes the source of your investment funds?
          </Text>

          <Text style={[styleGlobal.textCenter, styleGlobal.colorGray, styleGlobal.mB20]}>
            We need to ask for compliance purposes
          </Text>

          <Button
            onPress={() => this.handlePress('moneyEmployment')}
            block
            marginVert
          >
            <Text>Money from employment</Text>
          </Button>

          <Button
            onPress={() => this.handlePress('inheritenceGift')}
            block
            marginVert
          >
            <Text>Inheritence / Gift</Text>
          </Button>

          <Button
            onPress={() => this.handlePress('businessActivity')}
            block
            marginVert
          >
            <Text>Business Activity</Text>
          </Button>

          <Button
            onPress={() => this.handlePress('superSavings')}
            block
            marginVert
          >
            <Text>Super Savings</Text>
          </Button>

          <Button
            onPress={() => this.handlePress('financialInvestments')}
            block
            marginVert
          >
            <Text>Financial Investments</Text>
          </Button>

        </View>
      </Content>
    );
  }
}

export default connect()(SourceOfFunds);
