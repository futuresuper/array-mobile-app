
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThemeService from './ThemeService';

class ServicesManager extends Component {
  constructor(props) {
    super(props);

    ThemeService.init();
  }

  render() {
    return null;
  }
}

export default connect()(ServicesManager);
