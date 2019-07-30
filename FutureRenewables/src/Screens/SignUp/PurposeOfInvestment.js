
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
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

class PurposeOfInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.OCCUPATION);
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Investment Purpose
            </Text>

            <Text style={[sg.formHeadingDescription]}>
              Which of these best describes the purpose of your investment?
            </Text>
          </View>

          <View>
            <Button
              onPress={() => this.handlePress('saving')}
              block
              marginVert
            >
              <Text>Saving</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('retirement')}
              block
              marginVert
            >
              <Text>Retirement</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('investing')}
              block
              marginVert
            >
              <Text>Investing</Text>
            </Button>

            <Button
              onPress={() => this.handlePress('businessAccount')}
              block
              marginVert
            >
              <Text>Business account</Text>
            </Button>
          </View>

        </View>
      </Content>
    );
  }
}

export default connect()(PurposeOfInvestment);
