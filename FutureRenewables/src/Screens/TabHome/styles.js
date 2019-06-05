
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
    fontFamily: sc.font.bold,
  },
  title: {
    ...sg.headingS,
    color: sc.color.dark2,
    paddingRight: 7,
  },
  titleIcon: {
    fontSize: 19,
    color: sc.color.gray13,
    marginTop: 4,
  },
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
    backgroundColor: sc.containerBgColor,
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
  },
  contentItemLargeImage: {
    height: 125,
    width: 125,
  },
  containerBg: {
    backgroundColor: sc.containerBgColor,
  },
  graphBl: {
    height: 130,
    width: 350,
    alignSelf: 'center',
  },
  graphBottomLine: {
    backgroundColor: sc.containerBgColor,
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
  },
  impact: {
  },
};

export const article = {
  image: {
    width: '100%',
    height: 180,
  },
};
