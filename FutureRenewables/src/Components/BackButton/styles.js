
import {
  isIOS,
} from 'src/Common/Helpers';

export default {
  outOfHeader: {
    marginTop: isIOS() ? 0 : 5,
  },
};
