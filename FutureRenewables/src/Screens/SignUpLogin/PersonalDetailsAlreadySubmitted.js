
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
  H2
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

import { aboutAppForm as styles } from './styles';

class PersonalDetailsAlreadySubmitted extends Component {
  onNext() {
    const { screenProps, user } = this.props;
    screenProps.navigateTo(routeNames.INITIAL_INVESTMENT_AMOUNT);
  }

  render() {
    const {user} = this.props;
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[sg.formHeading, sg.mB30]}>
            Personal details already submitted
            </Text>


            <H2 style={styles.description}>
              Name: {user.fullName} 
            </H2>

            <H2 style={styles.descriptionP}>
              Email: {user.email}
            </H2>

            <H2 style={styles.descriptionP}>
              Phone: {user.mobile && user.mobile.number}
            </H2>

            <H2 style={[styles.descriptionP, sg.mB20]}>
              Pretty: {user.mobile.pretty && user.mobile.pretty}
            </H2>
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
