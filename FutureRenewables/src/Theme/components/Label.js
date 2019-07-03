// @flow

import {
  sg,
} from 'src/Styles';

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const labelTheme = {
    '.focused': {
      width: 0,
    },
    '.gray': {
      color: variables.labelGrayColor,
    },
    ...sg.formLabel,
    color: variables.labelColor,
  };

  return labelTheme;
};
