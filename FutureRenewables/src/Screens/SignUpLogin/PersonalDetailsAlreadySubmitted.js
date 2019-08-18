
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import {
  Content,
  Text,
  Button,
  H3
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

import {
  userSelector,
} from 'src/Redux/AppContent';


class PersonalDetailsAlreadySubmitted extends Component {
  onNext() {
    const { screenProps, user } = this.props;
    screenProps.navigateTo(routeNames.INITIAL_INVESTMENT_AMOUNT);
  }

  render() {
    const { user } = this.props;
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[sg.formHeading, sg.mB30]}>
            Personal details already submitted
            </Text>


            <H3 style={sg.mB20}>
              Name: {user.fullName} 
            </H3>

            <H3 style={sg.mB20}>
              Email: {user.email}
            </H3>

            <H3 style={sg.mB20}>
              Phone: {user.mobile && user.mobile.number}
            </H3>

            <H3 style={sg.mB20}>
              Pretty: {user.mobile.pretty && user.mobile.pretty}
            </H3>
          </View>


          <Button
            onPress={() => this.onNext()}
            block
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

PersonalDetailsAlreadySubmitted.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const user = userSelector(state);
  return {
    user,
  };
};


export default connect(mapStateToProps)(PersonalDetailsAlreadySubmitted);
