
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  View,
  Button,
  Icon,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import { referFriend as styles } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class ReferFriend extends Component {
  render() {
    return (
      <Content padder contentContainerStyle={[sg.flex, sg.jCCenter]}>

        <View style={{ alignItems: 'center' }}>
          <Text color2 style={[sg.textBold, sg.fS32, sg.mB50, sg.textCenter]}>
            Help build the
            {'\n'}
            movement.
          </Text>
          <Text style={sg.textCenter}>
            The more of our community that joins
            {'\n'}
            Array, the more positive impact we’ll be
            {'\n'}
            able to have on the planet.
            {'\n'}
            {'\n'}
            Share Array with your friends.
          </Text>

          <View style={[sg.row, sg.mT50]}>
            <Button
              style={styles.shareButton}
              // large
              icon
            >
              <Icon type="FontAwesome" name="facebook-f" style={sg.fS25} />
            </Button>
            <Button
              style={[styles.shareButton]}
              icon
            >
              <Icon type="FontAwesome5" name="twitter" style={sg.fS26} />
            </Button>
            <Button
              style={styles.shareButton}
              icon
            >
              <Icon type="FontAwesome5" name="facebook-messenger" style={sg.fS28} />
            </Button>
            <Button
              style={styles.shareButton}
              icon
            >
              <Icon type="Ionicons" name="logo-whatsapp" style={sg.fS27} />
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

export default connect()(ReferFriend);
