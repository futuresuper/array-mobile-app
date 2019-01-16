import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class FeedHeader extends React.Component {
  render() {
    const { itemContents } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.balance}>$84,536</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  balance: {
    fontSize: 48,
    fontWeight: '700',
    color: 'black',
  },
  header: {
    width: '100%',
    height: 200,
    backgroundColor: '#fccd3b',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
