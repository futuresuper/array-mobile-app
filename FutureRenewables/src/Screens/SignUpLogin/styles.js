
import {
  isIOS,
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacityTitle: {
    fontSize: 20,
  },
  checkmark: {
    alignSelf: 'center',
    backgroundColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingTop: isIOSv ? 0 : 4,
  },
  checkmarkTick: {
    color: 'white',
    fontSize: 30,
  },
};
