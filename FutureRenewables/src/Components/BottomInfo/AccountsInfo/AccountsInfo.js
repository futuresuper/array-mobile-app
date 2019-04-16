
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
} from 'native-base';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';
import {
  sg,
} from 'src/Styles';

import styles from './styles';

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
    const { superAccount } = this.props;
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

        <View style={sg.mT30}>
          <Button
            gray4
            block
            iconRight
          >
            <Text>Add account</Text>
            <Icon name="add" />
          </Button>

          {superAccount && (
            <View>
              <Button
                transparent
                bordered
                dark
                block
                style={sg.mT10}
              >
                <Text>Future Super Account</Text>
              </Button>

              <View style={sg.whatIsAccountBl}>
                <Text style={sg.whatIsAccount}>What&apos;s a Future Super Account?</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

AccountsInfo.defaultProps = {
  superAccount: true,
};

AccountsInfo.propTypes = {
  superAccount: PropTypes.bool,
};

export default AccountsInfo;
