
import deviceUtils from 'src/Common/device';

import {
  sc,
} from 'src/Styles';

const border = {
  borderColor: '#b9b9b9',
  borderBottomWidth: 1,
};

export default {
  container: {
    zIndex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    ...border,
  },
  listContainer: {
    maxHeight: deviceUtils.screenHeight() - 350,
    marginLeft: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 52,
  },
  list: {
    backgroundColor: 'white',
    left: 0,
    right: 0,
  },
  listItem: {
    marginHorizontal: 18,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: sc.color.gray12,
  },
  listItemText: {
    fontSize: 14,
    fontFamily: sc.font.bold,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
  },
};
