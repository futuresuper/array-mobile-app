
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
} from 'native-base';

import {
  styleGlobal,
} from 'src/Styles';

class PaperApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          PaperApp
          </Text>

          <Text style={styleGlobal.textCenter}>
            Dead End
          </Text>
        </View>
      </Content>
    );
  }
}

export default connect()(PaperApp);
