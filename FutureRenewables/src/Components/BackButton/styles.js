
import {
  isIOS,
} from 'src/Common/Helpers';

import {
  sc,
} from 'src/Styles';

export default {
  button: {
    paddingLeft: (sc.contentPadding - 16),
  },
  outOfHeader: {
    marginTop: isIOS() ? 0 : 5,
  },
};
