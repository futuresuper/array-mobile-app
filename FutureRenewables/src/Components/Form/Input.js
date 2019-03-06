
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Input as InputNB,
} from 'native-base';

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
          value={(formData && formData[formKey].value) || value}
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
