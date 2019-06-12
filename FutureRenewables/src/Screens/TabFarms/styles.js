
import {
  sc,
} from 'src/Styles';

export default {
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
  },
  solarFarmFinishDate: {
    color: sc.color.white,
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  solarFarmStatBl: {
    borderColor: sc.color.gray5,
  },
  solarFarmStatCol: {
    alignItems: 'center',
    width: 115,
  },
  solarForamStatAmount: {
    fontSize: 35,
    fontWeight: '900',
    color: sc.color.white,
    marginBottom: 10,
  },
  solarForamStatDescription: {
    textAlign: 'center',
    color: sc.color.white,
    fontWeight: '600',
  },
  solarFarmWeatherWidget: {
    marginTop: -20,
  },
  solarFarmPhotoCard: {
    marginRight: 10,
    elevation: 0,
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: null,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  solarFarmPhotoCardItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: sc.containerBgColor,
  },
  solarFarmPhotoTextBl: {
    padding: 8,
  },
  solarFarmPhotoPhoto: {
    height: 150,
    width: 150,
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
