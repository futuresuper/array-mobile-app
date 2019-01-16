import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import FeedItem from './FeedItem';

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]}
          renderItem={({ item }) => (
            <FeedItem
              itemContents={item.key}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#F9F9F9',
  }
});
