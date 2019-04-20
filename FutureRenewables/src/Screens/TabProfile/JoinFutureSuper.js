
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  H1,
  H2,
  H3,
  Button,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

// eslint-disable-next-line react/prefer-stateless-function
class JoinFutureSuper extends Component {
  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.center, sg.pB80]}>
        <H2 style={sg.textCenter}>Want to invest even more in renewables?</H2>

        <Text style={[sg.colorGray, sg.textCenter, sg.mT30, sg.mB50]}>
          Join Future Super to invest your super in ethical and climate concious companies.
        </Text>

        <View style={[sg.footerBl, sg.contentPadding]}>
          <Button
            gray4
            block
          >
            <Text>Join in a few minutes</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={sg.mV10}
          >
            <Text>Join in a few minutes</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(JoinFutureSuper);
