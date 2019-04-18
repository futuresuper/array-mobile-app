
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  View,
} from 'react-native';
import {
  Grid,
  Row,
  Col,
  Item,
  Label,
  Text,
  Switch as SwitchNB,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

class Switch extends Component {
  onPress(state) {
    const { onPress, formKey, dataKey } = this.props;
    if (onPress) {
      onPress(formKey, dataKey);
    }
  }

  render() {
    const {
      title,
      label,
      labelGray,
      formData,
      formKey,
      value,
    } = this.props;

    return (
      <Item>
        <Grid style={[sg.mT20, sg.mB20]}>
          <Label style={[sg.formLabel, labelGray ? sg.colorGray : {}]}>{label}</Label>
          <Row style={[sg.jCSpaceBetween, sg.pL5, sg.mT10, sg.aICenter]}>
            <Text style={[sg.fS22]}>{title}</Text>
            <SwitchNB
              value={(formData && !_.isNil(formData[formKey].value)) ? !!formData[formKey].value : !!value}
              onValueChange={(...args) => { this.onPress(...args); }}
            />
          </Row>
        </Grid>
      </Item>
    );
  }
}


Switch.defaultProps = {
  formData: null,
  formKey: '',
  dataKey: null,
  label: null,
  labelGray: false,
  title: null,
  onPress: null,
  value: false,
};

Switch.propTypes = {
  formData: PropTypes.object,
  formKey: PropTypes.string,
  dataKey: PropTypes.number,
  label: PropTypes.string,
  labelGray: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.bool,
};

export default Switch;
