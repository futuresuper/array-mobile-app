
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Content,
  Text,
} from 'native-base';

import {
  styleGlobal,
} from 'src/Styles';

import ListLinks from 'src/Components/ListLinks';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { screenProps } = this.props;

    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          Accounts
          </Text>

          <ListLinks
            navigateTo={screenProps.navigateTo}
            data={[
              {
                name: 'Super Application',
                screen: 'JoinSuper',
              },
              {
                name: 'New Application',
                screen: 'ApplicationType',
                params: { routeReset: false },
              },
              {
                name: 'Continue Application (auto app type)',
                screen: 'ApplicationType',
                params: { routeReset: false },
              },
            ]}
          />

        </View>
      </Content>
    );
  }
}

export default connect()(Accounts);
