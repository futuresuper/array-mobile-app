
import {
  StyleSheet,
} from 'react-native';

import {
  sc,
} from 'src/Styles';

export default {
  container: {
    marginTop: 8,
    marginBottom: 12,
  },
  label: {
    marginBottom: 10,
    marginTop: 15,
  },
  titleBl: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 0,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: sc.font.bold,
    marginLeft: 0,
  },
  icon: {
    color: sc.color.dark3,
    fontSize: 20,
  },
  listBl: {
    flexGrow: 1,
  },
  listSubBl: {
    position: 'absolute',
    maxHeight: (53 + StyleSheet.hairlineWidth) * 5,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemBl: {
  },
  listItemBlBorder: {
    // borderColor: sc.color.gray1,
    borderTopWidth: 1,
  },
  listItemTouch: {
    borderColor: 'red',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
};
