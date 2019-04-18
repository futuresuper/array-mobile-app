
import {
  StyleSheet,
} from 'react-native';

import {
  sc,
} from 'src/Styles';

export default {
  container: {
    marginTop: 5,
    marginBottom: 13,
  },
  label: {
    marginBottom: 10,
    marginTop: 15,
  },
  titleBl: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 25,
    marginLeft: 2,
  },
  icon: {
    fontSize: 20,
  },
  listBl: {
    flexGrow: 1,
  },
  listSubBl: {
    width: '94%',
    position: 'absolute',
    maxHeight: (53 + StyleSheet.hairlineWidth) * 5,
    borderRadius: 2,
    backgroundColor: sc.color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemBl: {
  },
  listItemBlBorder: {
    borderColor: sc.color.gray6,
    borderTopWidth: 1,
  },
  listItemTouch: {
    borderColor: 'red',
    padding: 20,
  },
};
