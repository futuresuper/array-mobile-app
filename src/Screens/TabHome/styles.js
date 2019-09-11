import { sc, sg } from 'src/Styles';

export default {
  plusButton: {
    alignSelf: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  plusButtonIcon: {
    fontSize: 33,
    marginLeft: 0,
    marginRight: 0,
  },
  contentBl: {
    padding: sc.contentPadding2,
    paddingTop: 0,
  },
  farmName: {
    borderBottomWidth: 1,
    borderBottomColor: sc.color.primary,
    marginTop: 8,
    paddingBottom: 2,
  },
  localTime: {
    color: sc.color.gray12,
    fontSize: 14,
    fontFamily: sc.font.medium,
    marginTop: 8,
  },
  contentItemSmallImage: {
    height: 45,
    width: 45,
    borderRadius: 5,
  },
  contentItemLargeImage: {
    height: 125,
    width: 125,
    borderRadius: 10,
  },
  containerBg: {
    backgroundColor: sc.color.containerBgColor,
  },
  graphBl: {
    height: 130,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  graphBottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
  },
  graphPointBl: {
    position: 'absolute',
    bottom: 39,
    right: 50,
  },
  graphPointText: {
    marginBottom: 6,
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  graphExample: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -45,
  },
  circleDay: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -75,
    // width: 381,
    width: '100%',
    height: 290,
  },
  impact: {},
  impactStats: { width: 65 },
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

export const article = {
  image: {
    width: '100%',
    height: 180,
  },
  paragraphStyles: {
    textAlign: 'justify',
    lineHeight: 25,
  },
  header: {
    height: 33,
    paddingTop: 2,
  },
};
