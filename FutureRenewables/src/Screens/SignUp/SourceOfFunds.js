
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
  sg,
} from 'src/Styles';

import {
  routeNames,
} from 'src/Navigation';

class SourceOfFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress(type) {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.PURPOSE_OF_INVESTMENT, { type });
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Funds source
            </Text>

            <Text style={[sg.formHeadingDescription]}>
              Which of these best describes the source of your investment funds? (We need to ask for compliance purposes)
            </Text>

            <Button
              onPress={() => this.handlePress('moneyEmployment')}
              bordered
              dark
              block
              marginVert
            >
              <Text>Money from employment</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('inheritenceGift')}
              yellow
              block
              marginVert
            >
              <Text>Inheritence / Gift</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('businessActivity')}
              bordered
              dark
              block
              marginVert
            >
              <Text>Business Activity</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('superSavings')}
              bordered
              dark
              block
              marginVert
            >
              <Text>Super Savings</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('financialInvestments')}
              bordered
              dark
              block
              marginVert
            >
              <Text>Financial Investments</Text>
            </Button>

          </View>

          <Button
            onPress={() => this.handlePress('hz')}
            block
            marginVert
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(SourceOfFunds);
