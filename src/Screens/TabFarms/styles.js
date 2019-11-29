import { isIOS } from 'src/Common/Helpers';

import { sc } from 'src/Styles';

export default {
  markerIconMain: {
    width: 36,
    height: 45,
  },
  markerIcon: {
    zIndex: 9,
  },
  markerIconActive: {
    zIndex: 10,
  },
  marketTitle: {
    color: sc.color.dark,
  },
  farmCardsBl: {
    position: 'absolute',
    bottom: sc.contentPadding,
    left: sc.contentPadding,
  },
  farmCardBl: {
    marginRight: 10,
  },
  farmCardItem: {
    paddingTop: 18,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 19,
  },
  farmCardImage: {
    height: 86,
    width: 86,
    borderRadius: 4,
  },
  farmCardBody: {
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  farmCardRight: {
    alignSelf: 'flex-start',
  },
  farmCardTextDescription: {
    fontSize: 16,
    fontFamily: sc.font.medium,
    marginTop: 5,
  },
  farmCardTextComplete: {
    color: sc.color.gray11,
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  solarFarmItemDescription: {
    color: sc.color.dark2,
    fontSize: 20,
    fontFamily: sc.font.medium,
    textAlign: 'center',
  },
  solarFarmFinishDate: {
    color: sc.color.white,
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  solarFarmStatBl: {
    flex: null,
    marginTop: 30,
    marginBottom: 50,
  },
  solarFarmStatCol: {
    alignItems: 'center',
    width: 115,
  },
  solarForamStatAmount: {
    color: sc.color.white,
    fontSize: 35,
    fontFamily: sc.font.bold,
    marginBottom: 10,
  },
  solarForamStatDescription: {
    color: sc.color.white,
    fontSize: 14,
    fontFamily: sc.font.medium,
    textAlign: 'center',
    width: 80,
  },
  solarFarmWeatherWidget: {
    marginTop: -20,
  },
  solarFarmPhotoCard: {
    marginRight: 20,
    elevation: 0,
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: null,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: null,
  },
  solarFarmPhotoCardItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: null,
  },
  solarFarmPhotoTextBl: {
    padding: 8,
  },
  solarFarmPhotoPhoto: {
    height: 225,
    width: 177,
  },
  solarFarmPhotoPosition: {
    color: sc.color.gray,
  },
  solarFarmWeatherWidgetBl: {
    alignItems: 'flex-end',
    paddingRight: 20,
    justifyContent: 'center',
    height: 60,
  },
};

export const farmsList = {
  markerImageContainer: {
    position: 'absolute',
    right: 0,
  },
  markerImage: {
    width: 31.2,
    height: 38.4,
  },
  farmContainer: {},
  farmImage: {
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: 15,
    marginBottom: 15,
    width: 317,
    height: 240,
  },
  farmTextBl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: isIOS() ? null : 15,
  },
  activityTabTitleBl: {
    justifyContent: 'center',
    paddingBottom: 0,
    paddingHorizontal: 1,
  },
  activityTabTitleBlActive: {
    borderBottomWidth: 2,
    borderRadius: 0,
  },
  activityTabTitleTextActive: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 12,
    fontFamily: sc.font.bold,
  },
  activityTabTitleText: {
    color: sc.color.gray12,
    fontFamily: sc.font.regular,
  },
};
