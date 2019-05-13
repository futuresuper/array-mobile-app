
import React from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView as KeyboardAvoidingViewRN,
} from 'react-native';

import {
  isIOS,
} from 'src/Common/Helpers';

const isIOSv = isIOS();

const KeyboardAvoidingView = (props) => {
  const { children } = props;
  let res = children;

  if (isIOSv) {
    res = (
      <KeyboardAvoidingViewRN behavior="position" keyboardVerticalOffset={60} {...props}>
        {children}
      </KeyboardAvoidingViewRN>
    );
  }

  return res;
};

KeyboardAvoidingView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeyboardAvoidingView;
