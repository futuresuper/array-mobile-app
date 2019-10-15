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

const SafeAreaView = ({
  children, forceInset, style, theme,
}) => (
  <RNSafeAreaView
    forceInset={{ ...defaultForceInset, ...forceInset }}
    style={[defaultStyle, { backgroundColor: theme.containerBgColor }, style]}
  >
    {children}
  </RNSafeAreaView>
);

SafeAreaView.defaultProps = {
  forceInset: {},
  style: {},
};

SafeAreaView.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  forceInset: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default SafeAreaView;
