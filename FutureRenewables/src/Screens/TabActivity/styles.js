
import {
  sc,
} from 'src/Styles';

export default {
  activityTabTitleBl: {
    paddingBottom: 0,
    paddingHorizontal: 1,
  },
  activityTabTitleBlActive: {
    borderBottomWidth: 2,
  },
  activityTabTitleText: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 20,
    color: sc.color.gray12,
    fontFamily: sc.font.regular,
  },
  activityTabTitleTextActive: {
    color: sc.color.dark2,
    fontFamily: sc.font.bold,
  },
  activityRow: {
    borderBottomWidth: 1,
    borderColor: sc.color.gray2,
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  activityRowHeader: {
    paddingTop: 0,
    paddingBottom: 15,
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
  },
  activityInvTitle: {
    borderBottomWidth: 1,
    borderColor: sc.color.gray2,
    paddingLeft: 15,
    paddingBottom: 10,
    marginHorizontal: sc.contentPadding2,
    marginBottom: 20,
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
    color: sc.color.dark2,
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
    borderColor: sc.color.gray2,
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
};

export const allInvestments = {
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: sc.color.gray2,
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
