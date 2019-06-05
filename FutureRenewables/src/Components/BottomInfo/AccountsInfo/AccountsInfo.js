
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
import TextUnderline from 'src/Components/TextUnderline';
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
      <View style={sg.mH5}>
        <List>
          <FlatList
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem noIndent style={[styles.listItem, (index === 0 ? sg.pT0 : {})]}>
                <Left style={[sg.flexNull]}>
                  <Thumbnail source={{ uri: item.image }} style={styles.thumbnail} />
                </Left>
                <Body>
                  <Text style={[sg.fontMedium, sg.fS20, sg.colorDark2, sg.mL20]}>{item.name}</Text>
                </Body>
                <Right style={[sg.flexNull, sg.width30]}>
                  <BadgeCheckmark inverted checked={item.active} style={sg.aSEnd} />
                </Right>
              </ListItem>
            )}
          />
        </List>

        <View style={[sg.mT30, sg.mH10]}>
          <Button
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
                style={sg.mT15}
              >
                <Text>Future Super Account</Text>
              </Button>

              <TextUnderline style={[sg.mT25]}>What&apos;s a Future Super Account?</TextUnderline>
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
