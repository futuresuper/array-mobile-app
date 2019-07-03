
import variable from 'src/Theme/variables/material';

export default (variables /* : * */ = variable) => {
  const theme = {
    '.color0': {
      tintColor: variables.textColor,
    },
    '.color2': {
      tintColor: variables.textColor2,
    },
  };

  return theme;
};
