// @flow

import variable from 'src/Theme/variables/material';
import {
  sc,
} from 'src/Styles';

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
    '.color5': {
      color: variables.textColor5,
    },
    '.disabledBordered': {
      borderBottomWidth: 1,
      borderColor: variables.inputBorderColor,
      color: sc.color.gray14,
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
