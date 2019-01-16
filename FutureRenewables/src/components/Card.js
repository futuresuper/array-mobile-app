import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.textAboveImage}>Text above the image</Text>
        <Image
          style={styles.image}
          source={require('../images/solarHeart.png')}
        />
        <Text style={styles.textHeadline}>Headline</Text>
        <Text style={styles.textBelowImage}>Text below the image</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textAboveImage: {
    padding: 12,
    fontSize: 14
  },
  textHeadline: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
    fontSize: 24
  },
  textBelowImage: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 14
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
});
