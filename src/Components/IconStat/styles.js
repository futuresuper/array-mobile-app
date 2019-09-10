
import {
  sc,
} from 'src/Styles';

export default {
  container: {
    alignItems: 'center',
    width: 90,
  },
  iconBl: {
    height: 60,
    borderRadius: 30,
    width: 60,
    alignItems: 'center',
    backgroundColor: sc.color.white,
    justifyContent: 'center',
  },
  icon: {
    color: sc.color.gray5,
  },
  iconText: {
    position: 'absolute',
    bottom: -18,
    fontSize: 28,
    fontWeight: '900',
  },
  description: {
    color: sc.color.gray,
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
  },
};
