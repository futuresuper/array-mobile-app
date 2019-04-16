
import {
  sc,
} from 'src/Styles';

import {
  isIOS,
} from 'src/Common/Helpers';

const isIOSc = isIOS();

export default {
  badge: {
    height: 20,
    width: 20,
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingTop: isIOSc ? 0 : 2,
    backgroundColor: sc.color.gray5,
    alignSelf: 'flex-start',
    justifyContent: isIOSc ? 'center' : undefined,
  },
  badgeIcon: {
    fontSize: 15,
  },
  iconTickColor: {
    color: 'black',
  },
  iconUntickTickColor: {
    color: 'transparent',
  },
  badgeInverted: {
    backgroundColor: sc.color.dark,
  },
  iconTickColorInverted: {
    color: 'white',
  },
  iconUntickColorInverted: {
    color: 'green',
  },
  badgeUntickInverted: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: sc.color.gray5,
  },
};
