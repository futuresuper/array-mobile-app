
import {
  sc,
} from 'src/Styles';

import {
  isIOS,
} from 'src/Common/Helpers';

const isIOSc = isIOS();

export default {
  container: {
    backgroundColor: sc.color.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: isIOSc ? 40 : 20,
    minHeight: 50,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  default: {
    backgroundColor: sc.color.gray6,
  },
  danger: {
    backgroundColor: sc.color.danger,
  },
  warning: {
    backgroundColor: sc.color.warning,
  },
  success: {
    backgroundColor: sc.color.success,
  },
  text: {
    color: sc.color.white,
    flex: 1,
  },
  text_default: {
    color: sc.color.dark,
  },
  button: {
    backgroundColor: 'transparent',
    height: 30,
    elevation: 0,
  },
  buttonText: {
    fontSize: 14,
  },
  icon: {
    fontSize: 22,
    marginRight: 10,
  },
};
