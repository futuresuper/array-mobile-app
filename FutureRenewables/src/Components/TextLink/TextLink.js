
import React from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
} from 'native-base';

import styles from './styles';

const TextLink = ({ children, url }) => (
  <TouchableOpacity
    style={{
      // flexDirection: 'column',
      // alignSelf: 'flex-start',
    }}
    onPress={() => {
      console.log('!!!1', {  });
    }}
  >
    {/* <TextInput
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
        alignSelf: 'flex-start',
      }}
      editable={false}
      pointerEvents="none"
      value={'My Text'}
      onTouchStart={() => {
        console.log('!!!', {  });
      }}
    /> */}
    <Text>asdasd</Text>
  </TouchableOpacity>
  // <View style={styles.container}>
  //   <Text
  //     onPress={() => {
  //       Linking.openURL(url);
  //     }}
  //     style={styles.text}
  //   >
  //     {children}
  //     {/* <Text style={{ borderWidth: 1, height: 10, width: 50 }}>sad</Text> */}
  //   </Text>
  // </View>
);

TextLink.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default TextLink;
