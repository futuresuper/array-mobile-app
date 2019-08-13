
export default {
  cameraView: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'black',
    flex: 1,
  },
  cameraButtonsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    // paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
  },
  buttonsBottom: {
    borderWidth: 2,
    borderColor: 'green',
    alignSelf: 'flex-end',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};
