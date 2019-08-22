import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Content, Button, Text } from 'native-base';

import { routeNames } from 'src/Navigation';

import { sg } from 'src/Styles';

import { userSelector } from 'src/Redux/AppContent';
import {
  applicationIdSelector,
} from 'src/Redux/Auth';

class PurposeOfInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePress(type) {
    const { screenProps, user, applicationId } = this.props;

    const body = {
      accountId: applicationId, // From response after Account Type
      purposeOfInvestment: type,
    };

    screenProps.Api.post(
      '/account',
      body,
      () => {
        if (user.personalDetailsLocked) {
          screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
        } else {
          screenProps.navigateTo(routeNames.OCCUPATION);
        }
      },
      () => {
        screenProps.toastDanger('Error. Try Again');
      },
    );
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>Investment Purpose</Text>

            <Text style={[sg.formHeadingDescription]}>Which of these best describes the purpose of your investment?</Text>
          </View>

          <View>
            <Button onPress={() => this.handlePress('saving')} block marginVert>
              <Text>Saving</Text>
            </Button>

            <Button onPress={() => this.handlePress('retirement')} block marginVert>
              <Text>Retirement</Text>
            </Button>

            <Button onPress={() => this.handlePress('investing')} block marginVert>
              <Text>Investing</Text>
            </Button>

            <Button onPress={() => this.handlePress('businessAccount')} block marginVert>
              <Text>Business account</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

PurposeOfInvestment.propTypes = {
  user: PropTypes.object.isRequired,
  applicationId: PropTypes.string.isRequired,

};

const mapStateToProps = (state) => {
  const user = userSelector(state);
  const applicationId = applicationIdSelector(state);

  return {
    user,
    applicationId,

  };
};

export default connect(mapStateToProps)(PurposeOfInvestment);
