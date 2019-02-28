
import {
  styleConstants,
} from 'src/Styles';

export default {
  container: {
    borderRadius: 6,
    overflow: 'hidden',
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: styleConstants.color.gray,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  containerError: {
    borderColor: styleConstants.color.errorBorder,
  },
  icon: {
    fontSize: 37,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: 5,
    textShadowRadius: 0,
  },
};
