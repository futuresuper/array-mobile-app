// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    ".note": {
      color: "#a7a7a7",
      fontSize: variables.noteFontSize
    },
    '.color2': {
      color: variables.textColor2,
    },
    '.color3': {
      color: variables.textColor3,
    },
  };

  return textTheme;
};
