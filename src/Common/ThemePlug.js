
import React from 'react';
import PropTypes from 'prop-types';
import {
  themeLight,
  themeDark,
} from 'src/Theme';

import {
  connect,
} from 'react-redux';


class ThemePlug extends React.Component {
  static async toggleTheme() {
    console.log('toggle');
  }

  static async setLight() {
    console.log('light');
  }

  static async setDark() {
    console.log('dark');
  }


  render() {
    return null;
  }
}

ThemePlug.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemePlug);
