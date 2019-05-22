
import {
  isIOS,
  rgbaByHex,
} from 'src/Common/Helpers';

import {
  sc,
} from 'src/Styles';

const isIOSv = isIOS();

export default {
  header: {
    color: sc.color.dark2,
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
  },
};

export const appLanding = {
  image: {
    position: 'absolute',
    top: (isIOSv ? 60 : 40),
    alignSelf: 'center',
  },
  topBl: {
    alignItems: 'center',
    paddingTop: (isIOSv ? 100 : 80),
    paddingBottom: (isIOSv ? 20 : 50),
    justifyContent: 'space-between',
  },
  textMiddle: {
    color: sc.color.dark2,
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    width: 180,
  },
};

export const buildYourImpact = {

};


export const ThanksShare = {
  opacityBl: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: rgbaByHex(sc.containerBgColor, 0.9),
  },
  thanksBl: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacityTitle: {
    fontSize: 20,
  },
  checkmark: {
    alignSelf: 'center',
    backgroundColor: sc.color.orange,
    height: 40,
    width: 40,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingTop: isIOSv ? 2 : 4,
  },
  checkmarkTick: {
    color: 'white',
    fontSize: 30,
  },
  profileBadge: {
    backgroundColor: sc.color.orange,
    borderRadius: 70 / 2,
    height: 70,
    width: 70,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profileBadgeText: {
    fontSize: 35,
  },
  borderListItem: {
    borderColor: sc.color.gray11,
  },
  imageBottom: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
};
