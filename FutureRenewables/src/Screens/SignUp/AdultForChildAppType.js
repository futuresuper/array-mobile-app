
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

class AdultForChildAppType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress(type) {
    const { screenProps } = this.props;

    if (type === 'individual') {
      screenProps.navigateTo('Name');
    } else {
      screenProps.navigateTo('JointNames');
    }
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          Adult for Child application
          </Text>

          <Text style={styleGlobal.textDescription}>
            Great, we&apos;ll note down
            <Text style={styleGlobal.textDescriptionBold}> [childFirstName]</Text>
            <Text style={styleGlobal.textDescriptionBold}> [childLastName] </Text>
            as the child on account.
          </Text>

          <Text style={[styleGlobal.textDescription, styleGlobal.mV20]}>
          What sort of Adult for Child account would you like to set up?
          </Text>

          <Button
            onPress={() => this.handlePress('individual')}
            block
          >
            <Text>Individual</Text>
          </Button>

          <Button
            onPress={() => this.handlePress('joint')}
            block
            secondary
            marginVert
          >
            <Text>Joint</Text>
          </Button>

        </View>
      </Content>
    );
  }
}

export default connect()(AdultForChildAppType);
