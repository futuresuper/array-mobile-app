
import { Header } from 'react-navigation';

import {
  isIOS,
} from 'src/Common/Helpers';

import {
  sc,
} from 'src/Styles';

const isIOSv = isIOS();

export default {
  imageHeader: {
    backgroundColor: sc.containerBgColor,
    position: 'absolute',
    top: -Header.HEIGHT,
    left: 0,
    right: 0,
    alignItems: 'center',
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
