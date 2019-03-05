
import {
  Platform,
} from 'react-native';

const border = {
  borderColor: '#b9b9b9',
  borderBottomWidth: 1,
};

const androidStyles = {
  container: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    ...border,
    marginBottom: 0,
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    margin: 10,
    marginTop: 0,
  },
};

export default {
  container: {
    zIndex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    ...border,
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    left: 0,
    right: 0,
  },
  listItem: {
    padding: 13,
  },
  listItemText: {
    fontSize: 18,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
  },
};
