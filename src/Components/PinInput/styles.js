
import {
  sc,
} from 'src/Styles';

export default {
  container: {
    alignItems: 'center',
  },
  placeholder: {
    width: 10,
    height: 10,
    borderRadius: 25,
    opacity: 0.3,
    backgroundColor: sc.color.dark,
  },
  mask: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: sc.color.dark,
  },
  text: {
    fontSize: 24,
    color: sc.color.dark,
  },
  cell: {
    borderBottomWidth: 2,
    borderColor: sc.color.secondary,
  },
  cellFocused: {
    borderColor: sc.color.primary,
  },
  errorBl: {
    fontSize: 14,
    color: sc.color.danger,
    fontFamily: sc.font.bold,
    marginTop: 5,
    marginLeft: 3,
  },
  helperBl: {
    fontSize: 14,
    color: sc.color.gray11,
    fontFamily: sc.font.medium,
    marginTop: 12,
    marginLeft: 3,
  },
};
