// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const viewTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    '.bg': {
      backgroundColor: variables.containerBgColor,
    },
  };

  return viewTheme;
};
