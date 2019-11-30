/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { routeNames } from 'src/Navigation';

import {
  Content, Text, Button, Icon, Grid, Col,
} from 'native-base';
import { sg } from 'src/Styles';
import { accountSelector } from 'src/Redux/Account';

const CircleIcon = ({ active }) => <Icon type="AntDesign" name="checkcircle" style={{ color: active ? '#51CCAA' : '#A09BB1' }} />;

CircleIcon.defaultProps = {
  active: false,
};

CircleIcon.propTypes = {
  active: PropTypes.bool,
};

class WhatsNext extends Component {
  handleNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.TAB_HOME);
  }

  render() {
    const { account } = this.props;
    const { initialInvestmentAmount } = account;

    const step3 = initialInvestmentAmount > 5000
      ? 'Once we’ve received your EFT payment you’ll see your updated balance in the Array app, and we’ll send you a confirmation email.'
      : 'Once we’ve received your direct debit payment you’ll see your updated balance in the Array app, and we’ll send you a confirmation email.';
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[sg.formHeading]}>
              {"What's Next"}
            </Text>
            <View>
              <Grid style={[sg.pB30]}>
                <Col style={sg.width50}>
                  <CircleIcon active />
                </Col>
                <Col>
                  <Text style={[sg.textBold, sg.fS17]}>
                    Now
                  </Text>
                  <Text style={[sg.fS11]}>
                    {'Your application is complete, and the direct debit for your initial investment has been requested from your bank.'}
                  </Text>
                </Col>
              </Grid>
              <Grid style={[sg.pB30]}>
                <Col style={sg.width50}>
                  <CircleIcon />
                </Col>
                <Col>
                  <Text style={[sg.textBold, sg.fS17]}>
                    A few minutes from now
                  </Text>
                  <Text style={[sg.fS11]}>
                    {'We’ll send you a confirmation email.'}
                  </Text>
                </Col>
              </Grid>
              <Grid style={[sg.pB30]}>
                <Col style={sg.width50}>
                  <CircleIcon />
                </Col>
                <Col>
                  <Text style={[sg.textBold, sg.fS17]}>
                    A few days from now
                  </Text>
                  <Text style={[sg.fS11]}>
                    {step3}
                  </Text>
                </Col>
              </Grid>
            </View>
          </View>
          <View>
            <Button onPress={() => this.handleNext()} block>
              <Text>Got it!</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

WhatsNext.propTypes = {
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const account = accountSelector(state);
  return {
    account,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WhatsNext);
