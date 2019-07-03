// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    '.textCenter': {
      textAlign: 'center',
    },
    '.color2': {
      color: variables.textColor2,
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 0,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize,
    fontFamily: variables.inputFontFamily,
  };

  return inputTheme;
};
