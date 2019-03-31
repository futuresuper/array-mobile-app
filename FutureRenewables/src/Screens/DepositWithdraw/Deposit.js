
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  Label,
  Input,
  Icon,
  Row,
  Col,
} from 'native-base';

import Picker from 'src/Components/Picker';

import {
  sg,
} from 'src/Styles';

// eslint-disable-next-line react/prefer-stateless-function
class Deposit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountList: [
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 0981928',
        },
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 0981928',
        },
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 0981928',
        },
      ],
    };
  }

  render() {
    let { accountList } = this.state;

    accountList = accountList.concat([{
      id: 'custom',
      name: 'Add account',
    }]);

    return (
      <View>
        <Item>
          <Icon type="FontAwesome" name="dollar" style={{fontSize: 15}} />
          <Input />
        </Item>
        <Item>
          <Col>
            <Label>123</Label>
            <Row>
              <Text>123</Text>
              <Icon type="FontAwesome" name="dollar" style={{fontSize: 15}} />
            </Row>
          </Col>
        </Item>

        <Item>
          <Picker
            label="asd"
            title="asdss"
            list={accountList}
            renderItem={({ item }) => {

              if (item.id === 'custom') {
                return (
                  <View style={[sg.row, sg.jCSpaceBetween]}>
                    <Text style={sg.pickerItemText}>{item.name}</Text>
                    <Icon name="add" />
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
            onPressItem={() => {
              console.log('!!!222', {  });
            }}
          />
        </Item>
      </View>
    );
  }
}

export default Deposit;
