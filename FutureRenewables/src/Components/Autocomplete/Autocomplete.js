
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';

import kleber from 'src/Common/Kleber';

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
        {
          AddressLine: 'adline',
          Locality: 'loc',
        },
      ],
      loading: false,
    };
  }

  onChangeText(e) {
    const { onChangeText } = this.props;
    const strLength = e.length;

    onChangeText(e);

    if (strLength > 3) {
      kleber.request(e).then((res) => {
        this.setState({
          list: res,
        });
      });
    } else {
      this.setState({
        list: [],
      });
    }
  }

  blur() {
    console.log('!!!blur', {  });
  }

  focus() {
    console.log('!!!focus', {  });
  }

  renderItem = ({ item }) => {
    const { loading } = this.state;

    if (loading) {
      return (null);
    }

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {}}
      >
        <Text style={styles.listItemText}>{item.AddressLine}</Text>
      </TouchableOpacity>
    );
  }

  renderResultList = () => {
    const { list } = this.state;

    return (
      <FlatList
        data={list}
        keyExtractor={(item, key) => `'${key}`}
        renderItem={this.renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={null}
      />
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View>
          <Input
            ref={(ref) => {
              this.textInput = ref;
            }}
            textCenter={false}
            onChangeText={(e) => { this.onChangeText(e); }}
            value={null}
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
