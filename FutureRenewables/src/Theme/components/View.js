// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding,
    },
    '.bg': {
      backgroundColor: variables.containerBgColor,
    },
    '.bgPicker': {
      backgroundColor: variables.pickerListBg,
    },
    '.bgToastDefault': {
      backgroundColor: variables.toast.defaultBg,
    },
    '.brList': {
      borderBottomColor: variables.borderColorList,
    },
    '.br': {
      borderBottomColor: variables.borderColor,
    },
    '.br2': {
      borderColor: variables.borderColor2,
    },
    '.br3': {
      borderColor: variables.borderColor3,
    },
  };

  return viewTheme;
};
