import { styleConstants } from 'src/Styles';

export default {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: styleConstants.color.light,
    paddingBottom: 60,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textBl: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    margin: 28,
    fontWeight: '900',
  },
};
