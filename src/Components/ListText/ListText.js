
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Grid,
  Row,
} from 'native-base';

import styles from './styles';

class ListText extends Component {
  render() {
    const { data, textStyle } = this.props;
    const mergeTextStyle = { ...styles.textStyle, ...textStyle };

    return (
      <Grid>
        {data.map((item, key) => (
          <Row key={key}>
            <Text style={[styles.disc, mergeTextStyle]}>{'\u2022'}</Text>
            <Text style={mergeTextStyle}>{item}</Text>
          </Row>
        ))}

      </Grid>
    );
  }
}

ListText.defaultProps = {
  textStyle: {},
};

ListText.propTypes = {
  data: PropTypes.array.isRequired,
  textStyle: PropTypes.object,
};

export default ListText;
