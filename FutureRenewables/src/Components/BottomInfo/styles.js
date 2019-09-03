
import {
  sc,
} from 'src/Styles';

export default {
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  containerModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topLineBl: {
    paddingTop: 18,
    paddingBottom: 27,
    borderWidth: 1, // swipe doesn't work on Android without it
    borderColor: sc.color.white,
  },
  topLine: {
    alignSelf: 'center',
    backgroundColor: sc.color.gray6,
    borderRadius: 3,
    height: 4,
    width: 40,
  },
};
