
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

class EntityOverseasTaxStatus extends React.Component {
  handlePress() {
    const { screenProps, navigation } = this.props;
    const type = navigation.getParam('type');
    screenProps.navigateTo('EntityTaxFileNumber', { type });
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={[styleGlobal.formHeading, styleGlobal.mB30]}>
          Is the company a resident for tax purposes of any country apart from Australia?
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

export default connect()(EntityOverseasTaxStatus);
