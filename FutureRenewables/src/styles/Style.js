import { StyleSheet } from 'react-native';
const styleSettings = require('./styleSettings.json');

export default StyleSheet.create({

  input: {
    fontFamily: styleSettings.font,
    height: 40,
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 4,
  },
  signUpFormContainer: {
    flex: 1,
    padding: styleSettings.padding.container,
    backgroundColor: styleSettings.color.light,
    justifyContent: 'space-between',
  },
  formHeading: {
    fontFamily: 'Lato',
    fontSize: 17,
    fontWeight: "900",
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  formError: {
    fontFamily: 'Lato',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 20,
  },

});
