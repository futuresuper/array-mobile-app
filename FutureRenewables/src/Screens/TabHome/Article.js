
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
} from 'native-base';

// eslint-disable-next-line react/prefer-stateless-function
class Article extends Component {
  render() {
    return (
      <Content padder>
        <Text>Article screen</Text>
      </Content>
    );
  }
}

export default connect()(Article);
