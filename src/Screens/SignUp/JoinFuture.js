
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import { routeNames } from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

class JoinFuture extends React.PureComponent {
  handleNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.JOIN_FUTURE_FORM);
  }

  handleSkip() {
    const { accountSelectSaveConnect, screenProps } = this.props;
    const { account, navigateTo } = screenProps;
    if (account.status === 'awaitingIdCheckAndMoney') {
      navigateTo(routeNames.ID_CHECK, { showBackButton:false });
    } else {
      screenProps.navigateTo(routeNames.TAB_HOME);
    }
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <View style={[sg.left]}>
              <Text style={sg.formHeading}>
                {'Join Future Super'}
              </Text>
              <Text>
                {'Future Super (who created Array) is Australia’s most renewables-focussed super fund.\n\n'}
              </Text>
              <Text style={[sg.bold]}>
                {'Now that you’ve signed up for Array, you can also switch to Future Super in just a few taps.'}
              </Text>
            </View>
          </View>
          <View>
            <Button onPress={() => this.handleNext()} block marginVert>
              <Text>Join Future Super</Text>
            </Button>
            <Button onPress={() => this.handleSkip()} bordered dark block marginVert>
              <Text>Skip</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

export default connect()(JoinFuture);
