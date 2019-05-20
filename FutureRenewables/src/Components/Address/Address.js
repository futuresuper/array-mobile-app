
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

import styles from './styles';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: false,
    };
  }

  onChangeText(e) {
    const { inputProps, Api } = this.props;
    const strLength = e.length;

    if (inputProps.onChangeText) {
      inputProps.onChangeText(e, inputProps.formKey, inputProps.dataKey);
    }

    if (strLength > 4) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        Api.get('/addresslist',
          {
            address: e,
          },
          (res) => {
            this.setState({
              list: res.addressList,
            });
          }, null, false);
      }, 300);
    } else {
      this.setState({
        list: [],
      });
    }
  }

  onPressItem = (item) => {
    const { onPressItem } = this.props;
    this.inputBlur();
    onPressItem(item);
  }

  onBlur = () => {
    this.setState({
      list: [],
    });
  }

  inputBlur() {
    const { textInput } = this;
    if (textInput) {
      textInput.blur();
    }
  }

  renderItem = ({ item }) => {
    const { loading } = this.state;

    if (loading) {
      return (null);
    }

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => { this.onPressItem(item); }}
      >
        <Text style={styles.listItemText}>
          {`${item.AddressLine}, ${item.Locality}, ${item.Postcode}`}
        </Text>
      </TouchableOpacity>
    );
  }

  renderResultList = () => {
    const { list } = this.state;

    return (
      <FlatList
        data={list}
        keyExtractor={(item, key) => `${key}`}
        renderItem={this.renderItem}
        contentContainerStyle={styles.list}
        bounces={false}
        ListEmptyComponent={null}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
      />
    );
  }

  render() {
    const { inputProps } = this.props;
    const { list } = this.state;

    return (
      <View style={[styles.container]}>
        <View>
          <Input
            helper="Home Address"
            ref={(ref) => {
              this.textInput = ref;
            }}
            textCenter={false}
            // value={null}
            onBlur={this.onBlur}
            {...inputProps}
            onChangeText={(e) => { this.onChangeText(e); }}
          />
        </View>
        {(list.length > 0)
          && (
            <View
              style={styles.listContainer}
              onStartShouldSetResponderCapture={() => false}
            >
              {this.renderResultList()}
            </View>
          )
        }
      </View>
    );
  }
}


Address.defaultProps = {
  onPressItem: () => null,
  inputProps: {},
};

Address.propTypes = {
  onPressItem: PropTypes.func,
  inputProps: PropTypes.object,
  Api: PropTypes.func.isRequired,
};

export default Address;
