
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

import {
  styleGlobal,
} from 'src/Styles';

class MultiPartyNextSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('FinalConfirmation');
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
            MultiPartyNextSteps
          </Text>

          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(MultiPartyNextSteps);
