
import {
  sc,
} from 'src/Styles';

export default {
  tabText: {
    color: sc.color.gray11,
    fontFamily: sc.font.regular,
  },
  tabTextActive: {
    fontSize: 20,
    fontFamily: sc.font.bold,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  doneTextBl: {
    marginTop: 40,
  },
  doneText: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: sc.font.regular,
    textAlign: 'left',
  },
  get doneTextBold() {
    return {
      ...this.doneText,
      fontFamily: sc.font.bold,
    };
  },
};
