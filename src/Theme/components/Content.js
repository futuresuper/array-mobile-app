// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const contentTheme = {
    flex: 1,
    backgroundColor: variables.containerBgColor,
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: "transparent"
    }
  };

  return contentTheme;
};
