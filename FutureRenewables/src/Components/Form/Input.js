
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Item,
  Input as InputNB,
  Label,
  Icon,
  Text,
} from 'native-base';
import _ from 'lodash';

import {
  sg,
} from 'src/Styles';

import { input as styles } from './styles';

class Input extends Component {
  onChangeText(e) {
    const { onChangeText, formKey, dataKey } = this.props;
    if (onChangeText) {
      onChangeText(e, formKey, dataKey);
    }
  }

  blur() {
    const { textInput } = this;
    if (textInput) {
      textInput._root.blur();
    }
  }

  focus() {
    const { textInput } = this;
    if (textInput) {
      textInput._root.focus();
    }
  }

  renderInputIconLeft() {
    const { iconLeft, label } = this.props;
    let res = null;

    if (iconLeft.name) {
      const iconStyle = [sg.inputIcon];
      if (label) {
        iconStyle.push(sg.inputIconLabel);
      }
      res = (
        <Icon
          type={iconLeft.type || undefined}
          name={iconLeft.name}
          style={[...iconStyle, iconLeft.style || {}]}
        />
      );
    }

    return res;
  }

  renderInputRightIcon() {
    const { iconRight } = this.props;

    if (!iconRight.name) {
      return null;
    }

    const style = [styles.inputIconRight, iconRight.style || {}];
    return (
      <Icon
        type={iconRight.type || undefined}
        name={iconRight.name}
        style={style}
      />
    );
  }

  renderLabel() {
    const { label, labelStyle, labelGray } = this.props;

    if (!label) {
      return null;
    }

    const style = [styles.label, labelGray ? sg.colorGray11 : {}, labelStyle];

    return (
      <Label style={style}>{label}</Label>
    );
  }

  renderHelpIcon() {
    const { onLabelRightIcon } = this.props;

    if (!onLabelRightIcon) {
      return null;
    }

    const style = [styles.labelIconRight];

    return (
      <TouchableOpacity
        onPress={onLabelRightIcon}
      >
        <Icon
          type="EvilIcons"
          name="question"
          style={style}
        />
      </TouchableOpacity>
    );
  }

  renderHelper() {
    const { helper } = this.props;

    if (_.isEmpty(helper)) {
      return null;
    }

    return (
      <Text style={styles.helperBl}>{helper}</Text>
    );
  }

  render() {
    const {
      formData,
      formKey,
      itemProps,
      value,
      label,
      disabled,
      containerStyle,
      inputLineColor,
    } = this.props;

    // console.log('!!!', formData);
    let formValue;
    if (
      formData
    ) {
      if (!_.isNil(formData[formKey].valueDisplay)) {
        formValue = formData[formKey].valueDisplay;
      } else if (formData[formKey].value) {
        formValue = formData[formKey].value;
      }
    }

    return (
      <View style={[sg.mB15, containerStyle]}>
        <Item
          // regular
          stackedLabel={!!label}
          error={(formData && formData[formKey].error) || false}
          {...itemProps}
          style={[{ borderColor: inputLineColor }, disabled ? sg.noBorder : {}, itemProps.style ? itemProps.style : {}]}
          iconLeft={false}
          icon
        >
          <View style={styles.labelBl}>
            {this.renderLabel()}
            {this.renderHelpIcon()}
          </View>
          <View style={[sg.row, sg.aICenter]}>
            {this.renderInputIconLeft()}
            <InputNB
              ref={(ref) => { this.textInput = ref; }}
              returnKeyType="next"
              // textCenter
              autoCorrect={false}
              {...this.props}
              onChangeText={(e) => { this.onChangeText(e); }}
              value={formValue || value}
            />
            {this.renderInputRightIcon()}
          </View>
        </Item>
        {this.renderHelper()}
      </View>
    );
  }
}

Input.defaultProps = {
  formData: null,
  formKey: '',
  dataKey: null,
  itemProps: {},
  onChangeText: null,
  value: '',
  label: null,
  labelGray: false,
  labelStyle: {},
  onLabelRightIcon: null,
  iconLeft: {
    type: null,
    name: null,
    style: {},
  },
  iconRight: {
    type: null,
    name: null,
    style: {},
  },
  disabled: false,
  helper: '',
  containerStyle: {},
  inputLineColor: undefined,
};

Input.propTypes = {
  formData: PropTypes.object,
  formKey: PropTypes.string,
  dataKey: PropTypes.number,
  itemProps: PropTypes.object,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  labelGray: PropTypes.bool,
  labelStyle: PropTypes.object,
  onLabelRightIcon: PropTypes.func,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  disabled: PropTypes.bool,
  helper: PropTypes.string,
  containerStyle: PropTypes.object,
  inputLineColor: PropTypes.string,
};

export default Input;
