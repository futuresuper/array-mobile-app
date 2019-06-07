
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
    borderBottomWidth: 2,
    borderColor: sc.color.gray2,
    padding: 10,
  },
  activityRowFirst: {
    borderTopWidth: 2,
  },
  activityColText: {
    fontWeight: '700',
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
  acitivityGraphExample: {
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
    borderColor: sc.color.gray5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 3,
    paddingBottom: 10,
    paddingLeft: 7,
  },
  investListItem: {
    paddingLeft: 10,
    paddingRigth: 20,
  },
};
