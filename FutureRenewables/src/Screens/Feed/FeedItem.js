import React from 'react';
import {
  View,
} from 'react-native';
import Card from './Card';
import FeedHeader from './FeedHeader';

export default class FeedItem extends React.Component {
  render() {
    const { itemContents } = this.props;
    return (
      <View>
        { itemContents.cardType === 'header' && <FeedHeader /> }
        { itemContents.cardType === 'update' && <Card /> }
      </View>
    );
  }
}
