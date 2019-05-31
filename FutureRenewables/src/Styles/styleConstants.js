
export default Object.freeze({
  mainColor: 'green',
  containerBgColor: '#F9F4EB',
  contentPadding: 20,
  color: {
    primary: '#FF615C',
    secondary: '#CCCCCC',
    light: '#FAFAFA',
    dark: '#000000',
    dark2: '#1A1E5E',
    dark3: '#2F2353',
    dark4: '#101343',
    dark3alpha: 'rgba(47,35,83, 56)',
    danger: '#d9534f',
    warning: '#f0ad4e',
    success: '#5cb85c',
    gray: '#919191',
    gray2: '#E8E9E8',
    gray3: '#6A6A6A',
    gray4: '#5C5C5C',
    gray5: '#CFCFCF',
    gray6: '#D8D8D8',
    gray7: '#777777',
    gray8: '#DCDCDC',
    gray9: '#F4F4F4',
    gray10: '#BEBEBE',
    gray11: '#766B97',
    orange: '#FFA334',
    lightGreen: '#6FCE1C',
    errorBorder: '#ed2f2f',
    white: 'white',
    white2: '#FAF3EB',
    get brightRed() {
      return this.color.primary;
    },
    get darkPurple() {
      return this.color.dark3;
    },
    get mediumPurple() {
      return this.color.gray11;
    },
    lightPurple: '#a09bb1',
    brightGreen: '#51ccaa',
    brightYellow: '#ffad3a',
    get backgroundLight() {
      return this.containerBgColor;
    },
    backgroundDark: '#11133d',
  },
  font: {
    black: 'BwGradual-Black',
    blackItalic: 'BwGradual-BlackItalic',
    bold: 'BwGradual-Bold',
    boldItalic: 'BwGradual-BoldItalic',
    extraBold: 'BwGradual-ExtraBold',
    extraBoldItalic: 'BwGradual-ExtraBoldItalic',
    light: 'BwGradual-Light',
    lightItalic: 'BwGradual-LightItalic',
    medium: 'BwGradual-Medium',
    mediumItalic: 'BwGradual-MediumItalic',
    regular: 'BwGradual-Regular',
    regularItalic: 'BwGradual-RegularItalic',
    thin: 'BwGradual-Thin',
    thinItalic: 'BwGradual-ThinItalic',
  },
  get fontFamily() {
    return this.font.regular;
  },
  fontSize: {
    h1: 30,
    h2: 24,
    h3: 18,
    h4: 14,
    p: 12,
  },
  fontWeight: {
    h1: 900,
    h2: 700,
    h3: 300,
    h4: 700,
    p: 300,
  },
  radius: 4,
  padding: {
    container: 20,
  },
  input: {
    backgroundColor: 'white',
  },
  keyboardAvoidingHeight: 100,
  inputHeightBase: 50,
});
