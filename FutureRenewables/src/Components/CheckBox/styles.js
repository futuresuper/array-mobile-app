
import {
  styleConstants,
} from 'src/Styles';

export default {
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: styleConstants.color.white,
    backgroundColor: styleConstants.color.white,
    paddingLeft: 4,
    paddingBottom: 1,
  },
  containerError: {
    borderColor: styleConstants.color.errorBorder,
  },
  icon: {
    fontSize: 26,
    lineHeight: 25,
    fontWeight: '900',
    marginTop: 1,
    textShadowRadius: 0,
  },
};
