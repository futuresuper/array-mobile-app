// @flow

import color from 'color';

import { Platform, Dimensions, PixelRatio } from 'react-native';

import {
  sc,
} from 'src/Styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';
const isIphoneX = platform === 'ios' && (deviceHeight === 812 || deviceWidth === 812 || deviceHeight === 896 || deviceWidth === 896);

export default {
  platformStyle,
  platform,

  // Accordion
  headerStyle: '#edebed',
  iconStyle: '#000',
  contentStyle: '#f5f4f5',
  expandedIconStyle: '#000',
  accordionBorderColor: '#d3d3d3',

  // Android
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  btnUppercaseAndroidText: false,

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  badgePadding: 0,

  // Button
  btnFontFamily: sc.font.medium,
  btnDisabledBg: sc.color.gray14,
  buttonPadding: 6,
  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnSecondaryBg() {
    return sc.color.secondary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return 16;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: sc.color.white,
  cardBorderColor: '#ccc',
  cardBorderRadius: 4,
  cardItemPadding: 15,

  // CheckBox
  CheckboxRadius: 0,
  CheckboxBorderWidth: 2,
  CheckboxPaddingLeft: 2,
  CheckboxPaddingBottom: 5,
  CheckboxIconSize: 16,
  CheckboxIconMarginTop: 1,
  CheckboxFontSize: 17,
  checkboxBgColor: '#039BE5',
  checkboxSize: 20,
  checkboxTickColor: '#fff',

  // Color
  brandPrimary: sc.color.primary,
  brandInfo: '#62B1F6',
  brandSuccess: sc.color.success,
  brandDanger: sc.color.danger,
  brandWarning: sc.color.warning,
  brandDark: sc.color.dark3,
  brandLight: '#f4f4f4',

  // Container
  containerBgColor: sc.color.containerBgColor,

  // Date Picker
  datePickerTextColor: '#000',
  datePickerBg: 'transparent',

  // Font
  DefaultFontSize: 16,
  fontFamily: sc.fontFamily,
  fontFamilyBold: sc.font.bold,
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: sc.footerHeight,
  footerDefaultBg: sc.color.light,
  footerPaddingBottom: 0,

  // FooterTab
  tabBarTextColor: '#bfc6ea',
  tabBarTextSize: 11,
  activeTab: '#fff',
  sTabBarActiveTextColor: '#007aff',
  tabBarActiveTextColor: '#fff',
  tabActiveBgColor: '#3F51B5',

  // Header
  toolbarBtnColor: '#fff',
  toolbarDefaultBg: '#3F51B5',
  toolbarHeight: 56,
  toolbarSearchIconSize: 23,
  toolbarInputColor: '#fff',
  searchBarHeight: platform === 'ios' ? 30 : 40,
  searchBarInputHeight: platform === 'ios' ? 40 : 50,
  toolbarBtnTextColor: '#fff',
  toolbarDefaultBorder: '#3F51B5',
  iosStatusbar: 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex();
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex();
  },

  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: 28,
  iconHeaderSize: 24,

  // InputGroup
  inputFontSize: 20,
  inputFontFamily: sc.font.bold,
  inputBorderColor: sc.color.gray12,
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: sc.color.errorBorder,
  inputHeightBase: sc.inputHeightBase,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return sc.color.gray11;
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: 24,

  // List
  listBg: 'transparent',
  listBorderColor: sc.color.gray2,
  listDividerBg: '#f4f4f4',
  listBtnUnderlayColor: '#DDD',
  listItemPadding: 12,
  listNoteColor: '#808080',
  listNoteSize: 13,
  listItemSelected: '#3F51B5',
  listItemIconColor: sc.color.dark,

  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',

  // Radio Button
  radioBtnSize: 23,
  radioSelectedColorAndroid: '#3F51B5',
  radioBtnLineHeight: 24,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  segmentBackgroundColor: sc.color.secondary,
  segmentActiveBackgroundColor: sc.color.secondary,
  segmentTextColor: sc.color.gray,
  segmentActiveTextColor: sc.color.gray,
  segmentBorderColor: '#b7b7b7',
  segmentBorderColorMain: '#b7b7b7',

  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Tab
  tabDefaultBg: '#3F51B5',
  topTabBarTextColor: '#b3c7f9',
  topTabBarActiveTextColor: '#fff',
  topTabBarBorderColor: '#fff',
  topTabBarActiveBorderColor: '#fff',

  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,

  // Text
  textColor: sc.color.dark3,
  textColor2: sc.color.dark2,
  textColor3: sc.color.dark2,
  textColor4: sc.color.dark3,
  textColor5: sc.color.gray12,
  inverseTextColor: '#FFF',
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: 'Roboto',
  titleFontSize: 19,
  subTitleFontSize: 14,
  subtitleColor: '#FFF',
  titleFontColor: '#FFF',

  // Other
  borderRadiusBase: sc.radius,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: sc.contentPadding,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,

  // iPhoneX SafeArea
  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34,
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21,
    },
  },

  footerIconColor: sc.color.dark3,
  graphExampleColor: sc.color.containerBgColor,
  iconColor: sc.color.dark,
  iconColor0: sc.color.dark3,

  btnDisabledIcon: sc.color.white,
  buttonPrimaryTextColor: sc.color.dark3,
  buttonDark3: {
    borderColor: sc.color.dark3,
    textColor: sc.color.dark3,
  },
  buttonDark5: {
    backgroundColor: sc.color.dark5,
    textColor: sc.color.white,
  },
  btnDisabled: {
    iconColor: sc.color.white,
  },

  borderColor: sc.color.gray6,
  borderColor2: sc.color.gray1,
  borderColor3: sc.color.primary,
  borderColorList: sc.color.gray2,

  labelColor: sc.color.dark3,
  labelGrayColor: 'red',

  pickerListBg: sc.color.white,

  toast: {
    defaultBg: sc.color.white,
  },
};
