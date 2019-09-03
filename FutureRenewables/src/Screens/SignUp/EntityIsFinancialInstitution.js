
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

class EntityIsFinancialInstitution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress(isFinInst) {
    const { screenProps } = this.props;

    if (isFinInst) {
      screenProps.navigateTo('PaperApp');
    } else {
      screenProps.navigateTo('AbnOrAcn');
    }
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          Is the company a financial institution (or investment entity managed by a financial institution)?
          </Text>

          <Button
            onPress={() => this.handlePress(false)}
            block
            style={styleGlobal.mT20}
          >
            <Text>No it&apos;s not a financial institution</Text>
          </Button>

          <Button
            onPress={() => this.handlePress(true)}
            block
            secondary
            marginVert
          >
            <Text>It is a financial institution</Text>
          </Button>

        </View>
      </Content>
    );
  }
}

export default connect()(EntityIsFinancialInstitution);
