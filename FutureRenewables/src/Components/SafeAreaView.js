import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView as RNSafeAreaView } from 'react-navigation';

const defaultForceInset = {
  top: 'always',
  left: 'always',
  right: 'always',
  bottom: 'always',
};

const defaultStyle = {
  flex: 1,
};

const SafeAreaView = ({ children, forceInset, style }) => (
  <RNSafeAreaView
    forceInset={{ ...defaultForceInset, ...forceInset }}
    style={style}
  >
    {children}
  </RNSafeAreaView>
);

SafeAreaView.propTypes = {
  children: PropTypes.node.isRequired,
  forceInset: PropTypes.object,
  style: PropTypes.object,
};
SafeAreaView.defaultProps = {
  forceInset: {},
  style: defaultStyle,
};

export default SafeAreaView;
