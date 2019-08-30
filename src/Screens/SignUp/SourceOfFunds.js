
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

import {
  applicationIdSelector,
} from 'src/Redux/Auth';

class SourceOfFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress(type) {
    const { screenProps, applicationId } = this.props;
    const body = {
        accountId: applicationId,
        sourceOfFunds: type,
      };
    screenProps.Api.post('/account', body, () => {
      screenProps.navigateTo(routeNames.PURPOSE_OF_INVESTMENT, { type });
    }, () => {
      screenProps.toastDanger('Error. Try Again');
    });
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

SourceOfFunds.propTypes = {
  applicationId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const applicationId = applicationIdSelector(state);
  return {
    applicationId,
  };
};

export default connect(mapStateToProps)(SourceOfFunds);
