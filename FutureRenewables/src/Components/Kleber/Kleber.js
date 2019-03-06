
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

class Kleber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: false,
    };
  }

  onChangeText(e) {
    const { inputProps } = this.props;
    const strLength = e.length;

    if (inputProps.onChangeText) {
      inputProps.onChangeText(e, inputProps.formKey, inputProps.dataKey);
    }

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


Kleber.defaultProps = {
  onPressItem: () => null,
  inputProps: {},
};

Kleber.propTypes = {
  onPressItem: PropTypes.func,
  inputProps: PropTypes.object,
};

export default Kleber;
