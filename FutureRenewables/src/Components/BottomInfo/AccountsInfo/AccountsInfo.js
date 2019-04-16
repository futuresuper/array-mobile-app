
import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import {
  H2,
  H3,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
} from 'native-base';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';
import {
  sg,
} from 'src/Styles';

class AccountsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: 'Hugh Jackman',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/World_Premiere_Logan_Berlinale_2017.jpg/220px-World_Premiere_Logan_Berlinale_2017.jpg',
          active: true,
        },
        {
          name: 'Cate Blanchett',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cate_Blanchett_Deauville_2013_3.jpg/176px-Cate_Blanchett_Deauville_2013_3.jpg',
          active: false,
        },
      ],
    };
  }

  render() {
    const { list } = this.state;

    return (
      <View>
        <List>
          <FlatList
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem noIndent>
                <Left style={[sg.flexNull, sg.mR5]}>
                  <Thumbnail source={{ uri: item.image }} small />
                </Left>
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <Right style={[sg.flexNull, sg.width30]}>
                  <BadgeCheckmark inverted checked={item.active} style={sg.aSEnd} />
                </Right>
              </ListItem>
            )}
          />
        </List>
      </View>
    );
  }
}

export default AccountsInfo;
