
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
    fontFamily: sc.font.bold,
    textAlign: 'center',
  },
};

export const appLanding = {
  image: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  topBl: {
    alignItems: 'center',
    paddingTop: 300,
    paddingBottom: (isIOSv ? sc.contentPadding : (sc.contentPadding + 20)),
    justifyContent: 'space-between',
  },
  textMiddle: {
    color: sc.color.dark2,
    fontSize: 35,
    fontFamily: sc.font.bold,
    textAlign: 'center',
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
    backgroundColor: rgbaByHex(sc.color.containerBgColor, 0.9),
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
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    paddingHorizontal: 12,
    paddingTop: isIOSv ? 3 : 5,
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
    fontFamily: sc.font.bold,
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

export const ArtistName = {
  checkmarkContainer: {
    backgroundColor: 'white',
    width: 33,
    height: 33,
    borderRadius: 33 / 2,
    justifyContent: 'center',
  },
  checkmark: {
    backgroundColor: sc.color.orange,
    alignSelf: 'center',
  },
  checkmarkTick: {
    color: 'white',
  },
};

export const aboutAppForm = {
  description: {
    fontSize: 10,
  },
  get descriptionUnderline() {
    return {
      ...this.description,
      textDecorationLine: 'underline',
    };
  },
  get descriptionP() {
    return {
      ...this.description,
      marginTop: 20,
    };
  },
};

export const taxNumbers = {
  switchCol: {
    alignItems: 'flex-end',
    width: 80,
  },
};
