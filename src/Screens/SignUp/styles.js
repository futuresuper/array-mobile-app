
import {
  sc,
} from 'src/Styles';

export default {
  addAddressManually: {
    color: sc.color.gray,
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
    backgroundColor: sc.color.lightGreen,
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
    color: sc.color.gray,
    fontSize: 12,
  },
  solarFarmCircle: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 150,
    width: 150,
  },
  addMoreButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: sc.color.gray,
    marginTop: 20,
  },
};

export const finalConfirmation = {
  scrollContainer: {
    backgroundColor: sc.color.white,
    marginHorizontal: sc.contentPadding,
    flex: 1,
    paddingLeft: 25,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollView: {
    marginRight: 20,
  },
  finalConfFooter: {
    backgroundColor: sc.color.containerBgColor,
    height: null,
    paddingLeft: sc.contentPadding,
    paddingRight: sc.contentPadding,
    paddingTop: sc.contentPadding,
    paddingBottom: sc.contentPadding,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
    elevation: 0,
  },
};

export const joinFutureForm = {
  scrollContainer: {
    backgroundColor: sc.color.white,
    //marginHorizontal: sc.contentPadding,
    flex: 1,
    paddingLeft: 25,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollView: {
    marginRight: 20,
  },
  finalConfFooter: {
    backgroundColor: sc.color.containerBgColor,
    height: null,
    paddingLeft: sc.contentPadding,
    paddingRight: sc.contentPadding,
    paddingTop: sc.contentPadding,
    paddingBottom: sc.contentPadding,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
    elevation: 0,
  },
};
