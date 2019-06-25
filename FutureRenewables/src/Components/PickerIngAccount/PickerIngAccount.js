
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import {
  Item,
  Text,
  Icon,
} from 'native-base';

import {
  Picker,
} from 'src/Components/Form';

import {
  sg,
} from 'src/Styles';


let accountList = [
  {
    name: 'ING Account',
    number: 'BSB 92300 Acc 0981928',
  },
  {
    name: 'ING Account',
    number: 'BSB 92300 Acc 222',
  },
  {
    name: 'ING Account',
    number: 'BSB 92300 Acc 333',
  },
];


accountList = accountList.concat([{
  id: 'custom',
  name: 'Add account',
}]);

const PickerIngAccount = (props) => {
  const { list } = props;

  return (
    <Item
      style={sg.noBorder}
    >
      <Picker
        list={list}
        renderItem={({ item }) => {
          if (item.id === 'custom') {
            return (
              <View
                style={[sg.row, sg.jCSpaceBetween]}
                onPress={() => {
                }}
              >
                <Text style={sg.pickerItemAddText}>{item.name}</Text>
                <Icon name="add" style={sg.pickerItemAddIcon} />
              </View>
            );
          }

          return (
            <View>
              <Text style={sg.pickerItemText}>{item.name}</Text>
              <Text style={sg.pickerItemText2}>{item.number}</Text>
            </View>
          );
        }}
        {...props}
      />
    </Item>
  );
};

PickerIngAccount.defaultProps = {
  list: accountList,
};

PickerIngAccount.propTypes = {
  list: PropTypes.array,
};

export default PickerIngAccount;
