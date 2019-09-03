
import {
  sc,
} from 'src/Styles';

import {
  isIOS,
} from 'src/Common/Helpers';

const isIOSc = isIOS();

export default {
  badge: {
    height: 18,
    width: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    paddingTop: 2,
    backgroundColor: sc.color.gray5,
    alignSelf: 'flex-start',
    justifyContent: isIOSc ? 'center' : undefined,
  },
  badgeIcon: {
    fontSize: 13,
  },
  iconTickColor: {
    color: 'black',
  },
  iconUntickTickColor: {
    color: 'transparent',
  },
  badgeInverted: {
    backgroundColor: sc.color.brightGreen,
  },
  iconTickColorInverted: {
    color: 'white',
  },
  iconUntickColorInverted: {
    color: 'green',
  },
  badgeUntickInverted: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: sc.color.gray12,
  },
};
