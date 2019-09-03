
import {
  sc,
} from 'src/Styles';

import material from './material';

export default {
  ...material,
  containerBgColor: sc.color.containerBgColor2,
  footerDefaultBg: sc.color.dark3,

  textColor: sc.color.white,
  textColor2: sc.color.white,
  textColor3: sc.color.gray12,
  textColor4: sc.color.gray11,
  textColor5: sc.color.gray11,

  footerIconColor: sc.color.white,
  graphExampleColor: sc.color.containerBgColor2,
  iconColor: sc.color.white,
  iconColor0: sc.color.white,
  listItemIconColor: sc.color.white,
  cardDefaultBg: sc.color.dark3,

  borderColor: sc.color.dark3,
  borderColor2: sc.color.gray18,
  borderColor3: sc.color.dark3,
  borderColorList: sc.color.dark3,
  listBorderColor: sc.color.dark3,

  brandDark: sc.color.white,

  btnDisabledBg: sc.color.gray16,
  buttonPrimaryTextColor: sc.color.white,
  buttonDark3: {
    ...material.buttonDark3,
    borderColor: sc.color.white,
    textColor: sc.color.white,
  },
  buttonDark5: {
    ...material.buttonDark5,
    backgroundColor: sc.color.white,
    textColor: sc.color.containerBgColor2,
  },
  btnDisabled: {
    ...material.btnDisabled,
    iconColor: sc.color.dark3,
  },

  labelColor: sc.color.white,
  labelGrayColor: 'blue',

  pickerListBg: sc.color.dark3,

  inputBorderColor: sc.color.gray17,

  toast: {
    ...material.toast,
    defaultBg: sc.color.dark3,
  },
};
