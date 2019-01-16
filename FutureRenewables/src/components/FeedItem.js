import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import FeedHeader from './FeedHeader';

export default class FeedItem extends React.Component {
  render() {
    const { itemContents } = this.props;
    return (
      <View>
        { itemContents == 'a' && <FeedHeader /> }
        <Card />
      </View>
    );
  }
}
