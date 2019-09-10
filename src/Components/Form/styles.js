
import {
  sc,
} from 'src/Styles';

// eslint-disable-next-line import/prefer-default-export
export const input = {
  labelBl: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  label: {
    paddingTop: 0,
    alignSelf: 'center',
  },
  labelIconRight: {
    color: sc.color.gray,
    marginTop: 0,
    paddingRight: 0,
  },
  inputIconRight: {
    fontSize: 22,
    marginTop: 0,
    color: sc.color.gray,
  },
  helperBl: {
    fontSize: 14,
    color: sc.color.gray11,
    fontFamily: sc.font.medium,
    marginTop: 12,
    marginLeft: 3,
  },
  errorBl: {
    fontSize: 14,
    color: sc.color.danger,
    fontFamily: sc.font.bold,
    marginTop: 5,
    marginLeft: 3,
  },
};

export const checkbox = {
  errorBl: {
    fontSize: 14,
    color: sc.color.danger,
    fontFamily: sc.font.bold,
    marginTop: 5,
    marginLeft: 3,
  },
};

export const picker = {
  get helperBl() {
    return {
      ...input.helperBl,
    };
  },
};
