
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Input as InputNB,
} from 'native-base';
import _ from 'lodash';

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

  render() {
    const {
      formData,
      formKey,
      itemProps,
      value,
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
        regular
        error={(formData && formData[formKey].error) || false}
        {...itemProps}
      >
        <InputNB
          ref={(ref) => { this.textInput = ref; }}
          returnKeyType="next"
          textCenter
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
};

Input.propTypes = {
  formData: PropTypes.object,
  formKey: PropTypes.string,
  dataKey: PropTypes.number,
  itemProps: PropTypes.object,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
