
import {
  sc,
} from 'src/Styles';

export default {
  text: {
    color: sc.color.dark3,
  },
  get textBold() {
    return {
      ...this.text,
      fontFamily: sc.font.bold,
    };
  },
  scrollView: {
    height: 290,
    paddingRight: 10,
    paddingLeft: 5,
  },
};
