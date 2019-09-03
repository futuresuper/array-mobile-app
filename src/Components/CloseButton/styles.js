
import {
  isIOS,
} from 'src/Common/Helpers';

import {
  sc,
} from 'src/Styles';

export default {
  button: {
    alignSelf: null,
    marginTop: isIOS() ? 0 : 10,
    marginRight: sc.contentPadding,
  },
  icon: {
    marginRight: 0,
  },
};
