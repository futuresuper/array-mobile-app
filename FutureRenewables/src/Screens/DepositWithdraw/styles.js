
import {
  sc,
} from 'src/Styles';

export default {
  tabText: {
    color: sc.color.dark2,
    fontFamily: sc.font.bold,
  },
  tabTextActive: {
    // color: sc.color.gray11,
    fontSize: 20,
    fontFamily: sc.font.regular,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  doneTextBl: {
    flex: 1,
    width: 260,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: sc.color.dark2,
    fontSize: 24,
    lineHeight: 36,
    fontFamily: sc.font.regular,
    textAlign: 'center',
  },
  get doneTextBold() {
    return {
      ...this.doneText,
      fontFamily: sc.font.bold,
    };
  },
};
