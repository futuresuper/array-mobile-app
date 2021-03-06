// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    fontFamily: variables.fontFamilyBold,
    '.color2': {
      color: variables.textColor2,
    },
  };

  return h1Theme;
};
