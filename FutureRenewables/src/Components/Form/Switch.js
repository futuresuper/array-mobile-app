
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
  sc,
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
      titleStyle,
      label,
      labelGray,
      formData,
      formKey,
      value,
      lineColor,
    } = this.props;

    return (
      <Item
        style={[{ borderColor: lineColor }]}
      >
        <Grid style={[sg.mT20, sg.mB15]}>
          <Label style={[sg.formLabel, labelGray ? sg.colorGray : {}]}>{label}</Label>
          <Row style={[sg.jCSpaceBetween, sg.pL0, sg.mT10, sg.aICenter]}>
            <Text style={[sg.fS20, sg.textBold, titleStyle, sg.aSEnd]}>{title}</Text>
            <SwitchNB
              value={(formData && !_.isNil(formData[formKey].value)) ? !!formData[formKey].value : !!value}
              onValueChange={(...args) => { this.onPress(...args); }}
              trackColor={{
                true: sc.color.brightGreen,
              }}
              style={sg.mB0}
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
  titleStyle: {},
  lineColor: undefined,
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
  titleStyle: PropTypes.object,
  lineColor: PropTypes.string,
};

export default Switch;
