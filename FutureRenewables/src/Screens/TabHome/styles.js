
import {
  sc,
} from 'src/Styles';

export default {
  mainAmount: {
    fontSize: 50,
    lineHeight: 50,
  },
  title: {
    fontSize: 26,
    paddingLeft: 0,
  },
  titleIcon: {
    fontSize: 18,
  },
  contentBl: {
    backgroundColor: sc.color.gray9,
    padding: 10,
    paddingTop: 30,
  },
  containerBg: {
    backgroundColor: sc.color.gray,
  },
  graphBl: {
    height: 100,
  },
  graphBottomLine: {
    backgroundColor: sc.color.gray9,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
  },
  graphPointBl: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  graphPointText: {
    marginBottom: 10,
    fontSize: 14,
  },
  grow: {
    position: 'absolute',
    alignSelf: 'center',
    height: '100%',
    bottom: '-60%',
  },
  impact: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
};
