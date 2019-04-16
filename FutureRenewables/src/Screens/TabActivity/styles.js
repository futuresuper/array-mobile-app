
import {
  styleConstants,
} from 'src/Styles';

export default {
  mainAmount: {
    fontSize: 50,
    lineHeight: 50,
  },
  title: {
    fontSize: 26,
    paddingLeft: 0,
  },
  titleIcon: {
    fontSize: 18,
  },
  activityTitle: {
    position: 'absolute',
    top: -15,
  },
  activityRow: {
    borderBottomWidth: 2,
    borderColor: styleConstants.color.gray2,
    padding: 10,
  },
  activityRowFirst: {
    borderTopWidth: 2,
  },
  activityColText: {
    fontWeight: '700',
  },
  activityColTextGray: {
    color: styleConstants.color.gray,
  },
  plusMinusBl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignItems: 'center',
    marginVertical: 30,
  },
  collected: {
    fontWeight: '600',
  },
  nextCollection: {
    color: styleConstants.color.gray,
    fontWeight: '600',
  },
  plusMinusValue: {
    fontSize: 25,
    fontWeight: '600',
  },
  investFarmTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  investFarmProgress: {
    fontSize: 40,
  },
  allInvestHeader: {
    borderColor: styleConstants.color.gray5,
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
