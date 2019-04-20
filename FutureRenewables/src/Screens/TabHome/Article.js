
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  H3,
} from 'native-base';

class Article extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      title: 'Sub head',
    });
  }


  render() {
    return (
      <Content padder>
        <H3>Take a look at exactly where your money goes with Array</H3>
      </Content>
    );
  }
}

export default connect()(Article);
