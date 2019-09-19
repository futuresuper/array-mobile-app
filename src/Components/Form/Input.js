
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
import { isEmpty, isNil, get } from 'lodash';

import {
  sg,
} from 'src/Styles';

import { input as styles } from './styles';

class Input extends Component {
  onChangeText(e) {
    console.log(e)
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

  renderRightComponent() {
    const { componentRight } = this.props;

    if (!componentRight) {
      return null;
    }

    if (typeof componentRight === 'function') {
      return componentRight();
    }

    return componentRight;
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

  renderErrorMessage(data) {
    if (data && data.error) {
      return <Text style={styles.errorBl}>{data.errorMessage}</Text>;
    }
    return null;
  }

  renderHelper() {
    const { helper } = this.props;

    if (isEmpty(helper)) {
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

    let formValue;
    const targetField = get(formData, formKey.split('.'));
    if (
      formData
    ) {
      if (!isNil(targetField.valueDisplay)) {
        formValue = targetField.valueDisplay;
      } else if (targetField.value) {
        formValue = targetField.value;
      }
    }
    return (
      <View style={[sg.mB15, containerStyle]}>
        <Item
          // regular
          stackedLabel={!!label}
          error={(formData && targetField.error) || false}
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
            {this.renderRightComponent()}
          </View>
        </Item>
        {this.renderErrorMessage(targetField)}
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
  componentRight: null,
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
  componentRight: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

export default Input;
