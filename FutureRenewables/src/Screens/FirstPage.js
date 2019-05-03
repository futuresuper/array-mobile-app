
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  userDataSave,
} from 'src/Redux/Auth';

import {
  users,
} from 'src/assets/testdata/testData';

// eslint-disable-next-line react/prefer-stateless-function
class FirstPage extends Component {
  render() {
    const { screenProps } = this.props;

    return (
      <Content>
        <Button
          onPress={() => {
            this.props.userDataSave(users.andrew);
            screenProps.navigateTo(routeNames.TAB_HOME);
          }}
          block
        >
          <Text>andrew</Text>
        </Button>

        <Button
          onPress={() => {
            this.props.userDataSave(users.liv);
            screenProps.navigateTo(routeNames.TAB_HOME);
          }}
          style={{ marginVertical: 50 }}
          block
        >
          <Text>liv</Text>
        </Button>

        <Button
          onPress={() => {
            this.props.userDataSave(users.dan);
            screenProps.navigateTo(routeNames.TAB_HOME);
          }}
          block
        >
          <Text>dan</Text>
        </Button>
      </Content>
    );
  }
}

const mapDispatchToProps = {
  userDataSave,
};

export default connect(null, mapDispatchToProps)(FirstPage);
