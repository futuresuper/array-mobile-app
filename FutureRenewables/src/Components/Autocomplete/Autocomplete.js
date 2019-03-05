
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';
import {
  Text,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';

import styles from './styles';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          AddressLine: 'adline',
          Locality: 'loc',
        },
      ],
    };
  }

  renderResultList = () => {
    const { list } = this.props;

    return (
      <FlatList
        data={this.state.list}
        keyExtractor={(item, key) => `'${key}`}
        renderItem={() => (
          <Text>123</Text>
        )}
      />
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View>
          <Input
            placeholder="asd"
          />
        </View>
        <View>
          {this.renderResultList()}
        </View>
      </View>
    );
  }
}


Autocomplete.defaultProps = {
  list: [],
};

Autocomplete.propTypes = {
  list: PropTypes.array,
};

export default Autocomplete;
