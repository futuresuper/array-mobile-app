import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { isNil, get } from 'lodash';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {
  sg,
} from 'src/Styles';

import styles from './styles';

const PinInput = ({
  formData, formKey, helper, onChangeText, masked,
}) => {
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

  const renderHelper = () => (
    <Text style={styles.helperBl}>
      {helper}
    </Text>
  );

  const renderErrorMessage = (data) => {
    if (data && data.error) {
      return <Text style={styles.errorBl}>{data.errorMessage}</Text>;
    }
    return null;
  };


  return (
    <View style={styles.container}>
      {renderErrorMessage(targetField)}
      <SmoothPinCodeInput
        placeholder={(
          <View style={styles.placeholder} />
        )}
        mask={(
          <View style={styles.mask} />
        )}
        textStyle={styles.text}
        cellStyle={styles.cell}
        cellStyleFocused={styles.cellFocused}
        cellSpacing={8}
        maskDelay={1000}
        password={masked}
        value={formValue}
        onTextChange={value => onChangeText(value, formKey)}
      />
      {renderHelper()}
    </View>
  );
};


PinInput.defaultProps = {
  formData: {},
  helper: 'Enter your PIN',
  masked: false,
};

PinInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  formData: PropTypes.object,
  formKey: PropTypes.string.isRequired,
  helper: PropTypes.string,
  masked: PropTypes.bool,
};

export default PinInput;
