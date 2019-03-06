
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
    ...border,
    maxHeight: 200,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginLeft: 2,
  },
  list: {
    backgroundColor: 'white',
    left: 0,
    right: 0,
  },
  listItem: {
    padding: 13,
  },
  listItemText: {
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
  },
};
