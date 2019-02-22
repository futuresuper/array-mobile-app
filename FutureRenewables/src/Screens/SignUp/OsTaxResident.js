
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

class OsTaxResident extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('TaxFileNumber');
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
            Are you a resident for tax purposes of any country apart from Australia?
          </Text>

          <Button
            onPress={() => this.handlePress()}
            block
            marginVert
          >
            <Text>Australian tax resident only</Text>
          </Button>

          <Button
            onPress={() => this.handlePress()}
            block
            secondary
            marginVert
          >
            <Text>Tax resident of other country</Text>
          </Button>

        </View>

      </Content>
    );
  }
}

export default connect()(OsTaxResident);
