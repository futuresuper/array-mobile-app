
export default Object.freeze({
  mainColor: 'green',
  contentPadding: 30,
  contentPadding2: 15,
  color: {
    containerBgColor: '#F9F4EB',
    containerBgColor2: '#12143C',
    primary: '#FF615C',
    secondary: '#CCCCCC',
    light: '#FAFAFA',
    white: 'white',
    white2: '#FAF3EB',
    dark: '#000000',
    dark2: '#1A1E5E',
    dark3: '#2F2353',
    dark4: '#101343',
    dark5: '#211545',
    dark3alpha: 'rgba(47,35,83, 59)',
    danger: '#d9534f',
    warning: '#f0ad4e',
    success: '#5cb85c',
    gray: '#919191',
    gray1: '#979797',
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
    gray12: '#A09BB1',
    gray13: '#A1A0B7',
    gray14: '#A39BA9',
    gray15: '#C0C0C0',
    gray16: '#70728A',
    orange: '#FFA334',
    lightGreen: '#6FCE1C',
    brightGreen: '#51ccaa',
    lightPurple: '#a09bb1',
    brightYellow: '#ffad3a',
    backgroundDark: '#11133d',
    get errorBorder() {
      return this.primary;
    },
    get brightRed() {
      return this.primary;
    },
    get darkPurple() {
      return this.dark3;
    },
    get mediumPurple() {
      return this.gray11;
    },
    get backgroundLight() {
      return this.containerBgColor;
    },
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
  footerHeight: 55,
  listBorderWidth: 1,
});
