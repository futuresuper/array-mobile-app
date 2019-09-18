import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import {
  Content, Text, Button, H3,
} from 'native-base';

import { routeNames } from 'src/Navigation';

import { sg } from 'src/Styles';

import { userSelector } from 'src/Redux/AppContent';

class PersonalDetailsAlreadySubmitted extends Component {
  onNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.INITIAL_INVESTMENT_AMOUNT);
  }

  renderLi(text, subLi = false) {
    const paddingLeft = sg.mL20;
    const style = subLi ? paddingLeft : {};

    return (
      <View style={[sg.row, sg.mT10, style]}>
        <Text style={sg.fS11}>{'\u2022'}</Text>
        <Text style={[paddingLeft]}>{text}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[sg.formHeading, sg.mB30]}>Your details</Text>
            <Text style={[sg.formHeadingDescription, sg.mB10]}>
              For this application, we'll use the following personal details which you have already provided:
            </Text>
            {this.renderLi('Name')}
            {this.renderLi('Email')}
            {this.renderLi('Phone Number')}
            {this.renderLi('Home Address')}
            {this.renderLi('Date of Birth')}
            {this.renderLi('Occupation')}
            {this.renderLi('Place of Birth')}
            {this.renderLi('Tax information')}
            {this.renderLi('Politically Exposed Person Status')}
            <Text style={[sg.formHeadingDescriptionm, sg.mT20]}>
              Please contact us on 1300 731 640 if you need to update any of your personal details.
            </Text>
          </View>

          <Button onPress={() => this.onNext()} block>
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
