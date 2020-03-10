
import {
  sc,
  sg,
} from 'src/Styles';

export default {
  mainAmount: {
    fontSize: 50,
    fontFamily: sc.font.bold,
    lineHeight: 50,
  },
  mainAmountCent: {
    color: sc.color.gray12,
    fontSize: 24,
    marginTop: -3,
    paddingTop: -3,
    fontFamily: sc.font.bold,
  },
  awaitingDebit: {
    color: sc.color.gray12,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
    fontFamily: sc.font.bold,
  },
  title: {
    ...sg.headingS,
    paddingRight: 7,
  },
  titleIcon: {
    fontSize: 19,
    color: sc.color.gray13,
    marginTop: 4,
  },
  amountIcon: {
    fontSize: 19,
    color: sc.color.gray13,
    marginTop: 4,
    marginRight: 4,
  },
};
