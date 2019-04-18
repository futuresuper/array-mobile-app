// @flow

import {
  sg,
} from 'src/Styles';

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const labelTheme = {
    ".focused": {
      width: 0
    },
    ...sg.formLabel,
  };

  return labelTheme;
};
