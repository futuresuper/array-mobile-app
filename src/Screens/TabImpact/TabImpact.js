/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from 'native-base';


class TabHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <Content bounces />
    );
  }
}

TabHome.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
