
import {
  sc,
} from 'src/Styles';

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
  },
  contentItemLargeImage: {
    height: 125,
    width: 125,
  },
  containerBg: {
    backgroundColor: sc.color.containerBgColor,
  },
  graphBl: {
    height: 130,
    width: 350,
    alignSelf: 'center',
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
    width: 381,
    height: 290,
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
