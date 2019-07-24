
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

class IdCheckAdd extends Component {
  renderButton(type) {
    const { screenProps } = this.props;
    const name = idCheckUtils.getTypeName(type);

    return (
      <Button
        block
        bordered
        dark
        style={sg.mB15}
        onPress={() => {
          screenProps.navigateTo(routeNames.ID_CHECK_DETAILS, { newItemByType: type });
        }}
      >
        <Text>{name}</Text>
      </Button>
    );
  }

  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <Text style={[sg.formHeading32, sg.mB50]}>
          Add another ID
        </Text>

        {this.renderButton(idCheckUtils.ID_TYPE.PASSPORT)}
        {this.renderButton(idCheckUtils.ID_TYPE.DRIVERS_LICENSE)}
        {this.renderButton(idCheckUtils.ID_TYPE.MEDICARE_CARD)}
      </Content>
    );
  }
}

export default connect()(IdCheckAdd);
