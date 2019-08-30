
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  FlatList,
  View,
} from 'react-native';

import {
  Content,
} from 'native-base';

import FeedItem from './FeedItem';
import styles from './styles';

class Feed extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Content>
      <View style={styles.list}>
        <FlatList
          data={[
            {
              key: 'a',
              cardType: 'header',
            },
            {
              key: 'b',
              cardType: 'update',
              category: 'news',
            },
            {
              key: 'c',
            },
            {
              key: 'd',
            },
          ]}
          renderItem={({ item }) => (
            <FeedItem
              itemContents={item}
            />
          )}
        />
      </View>
      </Content>
    );
  }
}


export default connect()(Feed);
