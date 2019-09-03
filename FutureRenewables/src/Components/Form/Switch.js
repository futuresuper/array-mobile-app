
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Grid,
  Row,
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
  onPress() {
    const { onPress, formKey, dataKey } = this.props;
    if (onPress) {
      onPress(formKey, dataKey);
    }
  }

  renderSwitch() {
    const {
      formData,
      formKey,
      value,
      trackColor: trackColorProps,
      ...restProps
    } = this.props;

    const trackColor = {
      true: sc.color.brightGreen,
      ...trackColorProps,
    };

    return (
      <SwitchNB
        value={(formData && !_.isNil(formData[formKey].value)) ? !!formData[formKey].value : !!value}
        onValueChange={(...args) => { this.onPress(...args); }}
        style={sg.mB0}
        trackColor={trackColor}
        {...restProps}
      />
    );
  }

  render() {
    const {
      title,
      titleStyle,
      label,
      labelGray,
      lineColor,
      pure,
    } = this.props;

    if (pure) {
      return this.renderSwitch();
    }

    return (
      <Item
        style={[{ borderColor: lineColor }]}
      >
        <Grid style={[sg.mT20, sg.mB15]}>
          <Label style={[sg.formLabel, labelGray ? sg.colorGray : {}]}>{label}</Label>
          <Row style={[sg.jCSpaceBetween, sg.pL0, sg.mT10, sg.aICenter]}>
            <Text style={[sg.fS20, sg.textBold, titleStyle, sg.aSEnd]}>{title}</Text>
            {this.renderSwitch()}
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
  pure: false,
  trackColor: {},
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
  pure: PropTypes.bool,
  trackColor: PropTypes.object,
};

export default Switch;
