
import {
  styleConstants,
} from 'src/Styles';

export default {
  addAddressManually: {
    color: styleConstants.color.gray,
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  segment: {
    height: 55,
    marginTop: 5,
    marginBottom: 5,
  },
  segmentButtonActive: {
    backgroundColor: styleConstants.color.lightGreen,
  },
  segmentButton: {
    paddingTop: 8,
    paddingBottom: 8,
    height: 40,
  },
  segmentButtonTextActive: {
    color: 'black',
  },
  colLeftStyle: {
    flex: 0.35,
    padding: 5,
  },
  colRightStyle: {
    padding: 5,
  },
  checkBoxCol: {
    width: 65,
  },
  textAgree: {
    color: styleConstants.color.gray,
    fontSize: 12,
  },
  finalConfFooter: {
    borderTopWidth: 1,
    borderColor: styleConstants.color.gray,
    backgroundColor: styleConstants.color.light,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
    elevation: 0,
  },
  solarFarmCircle: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 150,
    width: 150,
  },
};
