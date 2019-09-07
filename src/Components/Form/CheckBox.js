
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import CheckBoxOrig from 'src/Components/CheckBox';

class CheckBox extends Component {
  onPress() {
    const { onPress, formKey, dataKey } = this.props;
    if (onPress) {
      onPress(formKey, dataKey);
    }
  }

  render() {
    const {
      formData,
      formKey,
      value,
    } = this.props;

    return (
      <CheckBoxOrig
        error={(formData && formData[formKey].error) || false}
        {...this.props}
        checked={(formData && !isNil(formData[formKey].value)) ? !!formData[formKey].value : !!value}
        onPress={() => { this.onPress(); }}
      />
    );
  }
}

CheckBox.defaultProps = {
  formData: null,
  formKey: '',
  dataKey: null,
  itemProps: {},
  onPress: null,
  value: false,
};

CheckBox.propTypes = {
  formData: PropTypes.object,
  formKey: PropTypes.string,
  dataKey: PropTypes.number,
  itemProps: PropTypes.object,
  onPress: PropTypes.func,
  value: PropTypes.bool,
};

export default CheckBox;
