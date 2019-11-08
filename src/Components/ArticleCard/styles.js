import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  subheadText: {
    fontSize: 13,
  },
  textAtTop: {
    fontSize: 13,
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageOverlayContainer: {
    padding: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  imageOverlayContainerText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    flex: 0.8,
  },
  imageOverlayContainerButton: {
    flex: 0.2,
  },
});
