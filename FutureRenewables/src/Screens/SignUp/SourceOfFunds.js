
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
              Which of these best describes the source of your investment funds?
            </Text>

          </View>

          <View>
            <Button
              onPress={() => this.handlePress('moneyEmployment')}
              block
              marginVert
            >
              <Text>Money from working</Text>
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

        </View>
      </Content>
    );
  }
}

export default connect()(SourceOfFunds);
