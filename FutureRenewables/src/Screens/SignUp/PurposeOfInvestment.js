
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

import ListLinks from 'src/Components/ListLinks';

import {
  styleGlobal,
} from 'src/Styles';

class PurposeOfInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // eslint-disable-next-line class-methods-use-this
  handlePress() {
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
            Which of these best describes the purpose of your investment?
          </Text>

          <Text style={[styleGlobal.textCenter, styleGlobal.colorGray, styleGlobal.mB20]}>
            We need to ask for compliance purposes
          </Text>

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

        <ListLinks
            navigateTo={this.props.screenProps.navigateTo}
            data={[
              {
                name: 'Individual or Sole Trader',
                screen: 'OsTaxResident',
              },
              {
                name: 'Other',
                screen: 'MultiPartyNextSteps',
              },
            ]}
          />
      </Content>
    );
  }
}

export default connect()(PurposeOfInvestment);
