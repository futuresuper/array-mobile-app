
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  H3,
} from 'native-base';

class Article extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});

    navigation.setParams({
      title: item.subhead,
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

// const mapStateToProps = (state, ownProps) => {
//   const item = ownProps.navigation.getParam('item', []);
// };

export default connect()(Article);
