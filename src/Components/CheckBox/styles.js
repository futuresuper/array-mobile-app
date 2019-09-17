
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
    borderColor: styleConstants.color.gray,
    backgroundColor: styleConstants.color.white,
    paddingLeft: 4,
    paddingBottom: 1,
  },
  containerError: {
    borderColor: styleConstants.color.errorBorder,
  },
  containerChecked: {
    borderColor: styleConstants.color.brightGreen,
    backgroundColor: styleConstants.color.brightGreen,
  },
  icon: {
    fontSize: 26,
    lineHeight: 25,
    fontWeight: '900',
    marginTop: 1,
    color: 'transparent',
    textShadowRadius: 0,
  },
  iconChecked: {
    color: styleConstants.color.white,
  },
};
