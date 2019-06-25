
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
        <Text style={[sg.headingM, sg.fS35]}>
          Want to
          {'\n'}
          invest even
          {'\n'}
          more in
          {'\n'}
          renewables?
        </Text>

        <Text style={[sg.colorDark3, sg.textCenter, sg.mT25, sg.mB80]}>
          Join Future Super to invest
          {'\n'}
          your super in ethical and
          {'\n'}
          climate concious companies.
        </Text>

        <View style={[sg.footerBl, sg.contentPadding]}>
          <Button
            block
          >
            <Text>Join in a few minutes</Text>
          </Button>
          <Button
            bordered
            dark
            block
            style={sg.mV20}
          >
            <Text>Join in a few minutes</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(JoinFutureSuper);
