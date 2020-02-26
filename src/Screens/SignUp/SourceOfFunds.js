
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
import { accountIdSelector, accountUpdateSave } from 'src/Redux/Account';


class SourceOfFunds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress(type) {
    const { screenProps, accountId, accountUpdateSaveConnect } = this.props;
    const body = {
      accountId,
      sourceOfFunds: type,
    };
    screenProps.Api.post('/account', body, (res) => {
      accountUpdateSaveConnect(res);
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
              onPress={() => this.handlePress('inheritanceGift')}
              block
              marginVert
            >
              <Text>Inheritance / Gift</Text>
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
  accountId: PropTypes.string.isRequired,
  accountUpdateSaveConnect: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  accountUpdateSaveConnect: accountUpdateSave,
};


const mapStateToProps = (state) => {
  const accountId = accountIdSelector(state);
  return {
    accountId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceOfFunds);
