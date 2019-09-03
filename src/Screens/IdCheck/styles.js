
import {
  sc,
} from 'src/Styles';

export default {
  itemBl: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 20,
  },
  itemStatusIcon: {
    fontSize: 20,
  },
  get itemStatusIconErr() {
    return {
      ...this.itemStatusIcon,
      color: sc.color.primary,
    };
  },
  get itemStatusIconOk() {
    return {
      ...this.itemStatusIcon,
      color: sc.color.brightGreen,
    };
  },
  itemStatusText: {
    fontSize: 14,
    fontFamily: sc.font.bold,
    marginLeft: 5,
  },
  get itemStatusTextErr() {
    return {
      ...this.itemStatusText,
      color: sc.color.primary,
    };
  },
  get itemStatusTextOk() {
    return {
      ...this.itemStatusText,
      color: sc.color.brightGreen,
    };
  },
};

export const idCheckOnline = {
  text: {
    fontSize: 10,
  },
  get textBold() {
    return {
      ...this.text,
      fontFamily: sc.font.bold,
    };
  },
};
