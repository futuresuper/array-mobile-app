
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Input as InputNB,
  Label,
  Icon,
} from 'native-base';
import _ from 'lodash';

import {
  sg,
} from 'src/Styles';

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

  renderIconLeft = () => {
    const { iconLeft } = this.props;
    let res = null;

    if (iconLeft.name) {
      res = (
        <Icon
          type={iconLeft.type || undefined}
          name={iconLeft.name}
          style={[sg.inputIcon, iconLeft.style || {}]}
        />
      );
    }

    return res;
  }

  render() {
    const {
      formData,
      formKey,
      itemProps,
      value,
      label,
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
      <Item
        // regular
        stackedLabel={!!label}
        error={(formData && formData[formKey].error) || false}
        {...itemProps}
      >
        {label && <Label>{label}</Label>}
        {this.renderIconLeft()}
        <InputNB
          ref={(ref) => { this.textInput = ref; }}
          returnKeyType="next"
          // textCenter
          autoCorrect={false}
          {...this.props}
          onChangeText={(e) => { this.onChangeText(e); }}
          value={formValue || value}
        />
      </Item>
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
  iconLeft: {
    type: null,
    name: null,
    style: {},
  },
};

Input.propTypes = {
  formData: PropTypes.object,
  formKey: PropTypes.string,
  dataKey: PropTypes.number,
  itemProps: PropTypes.object,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  iconLeft: PropTypes.object,
};

export default Input;
