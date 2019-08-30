
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
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import idCheckUtils from 'src/Common/idCheck';

import {
  sg,
} from 'src/Styles';

class IdCheck extends Component {
  componentDidMount() {
    const { screenProps } = this.props;
    screenProps.toast('Application Complete', { iconType: 'MaterialCommunityIcons', iconName: 'check-circle' });
  }

  renderButton(type) {
    const { screenProps } = this.props;
    const name = idCheckUtils.getTypeName(type);

    return (
      <Button
        block
        marginVert
        style={sg.mT0}
        onPress={() => {
          screenProps.navigateTo(routeNames.ID_CHECK_DETAILS, { newItemByType: type });
        }}
      >
        <Text>Add {name}</Text>
      </Button>
    );
  }

  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
            Your ID check
            </Text>
            <Text style={sg.formHeadingDescription}>
              Please provide your Drivers Licence or Passport Number
            </Text>
          </View>
          <View>
            {this.renderButton(idCheckUtils.ID_TYPE.DRIVERS_LICENSE)}
            {this.renderButton(idCheckUtils.ID_TYPE.PASSPORT)}
            {this.renderButton(idCheckUtils.ID_TYPE.MEDICARE_CARD)}
          </View>
        </View>
      </Content>
    );
  }
}

export default connect()(IdCheck);
