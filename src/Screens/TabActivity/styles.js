import { sc } from 'src/Styles';
import {
  isIOS,
} from 'src/Common/Helpers';

export default {
  activityGraph: {
    zIndex: 2,
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
  activityTabTitleText: {
    color: sc.color.gray12,
    fontFamily: sc.font.regular,
  },
  activityTabTitleTextActive: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 12,
    fontFamily: sc.font.bold,
  },
  activityRow: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingTop: 20,
    paddingBottom: isIOS() ? 20 : 30,
  },
  activityRowHeader: {
    paddingTop: 0,
    paddingBottom: isIOS() ? 15 : 25,
  },
  activityCol: {
  },
  activityColText: {
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  activityColTextGray: {
    color: sc.color.gray,
  },
  activityChartBl: {
    borderBotomWidth: 1,
    borderColor: sc.color.gray2,
    height: 165,
    marginBottom: 15,
    overflow: 'hidden',
  },
  activityCircleDay: {
    position: 'absolute',
    bottom: -130,
    width: 381,
    height: 290,
  },
  activityInvTitle: {
    paddingLeft: 15,
    marginHorizontal: sc.contentPadding2,
  },
  plusMinusBl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignItems: 'center',
    marginVertical: 30,
  },
  collected: {
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  nextCollection: {
    color: sc.color.gray11,
    fontSize: 14,
    fontFamily: sc.font.medium,
  },
  plusMinusValue: {
    fontSize: 36,
    fontFamily: sc.font.bold,
  },
  investFarmTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  investFarmProgress: {
    fontSize: 40,
  },
  allInvestHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 20,
    marginHorizontal: sc.contentPadding2,
  },
  investListItem: {
    paddingLeft: 10,
    paddingRigth: 20,
  },
  investGraph: {
    height: 168,
    width: 168,
  },
};

export const allInvestments = {
  itemContainer: {
    borderBottomWidth: 1,
  },
  itemContainerFirst: {
    borderTopWidth: 1,
  },
  icon: {
    tintColor: sc.color.gray11,
    width: '100%',
  },
  get iconSun() {
    return {
      ...this.icon,
      height: 16,
    };
  },
  get iconHeart() {
    return {
      ...this.icon,
      height: 16,
    };
  },
};
