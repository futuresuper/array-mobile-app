
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, isEmpty, get } from 'lodash';
import {
  View,
} from 'react-native';

import {
  Item,
  Text,
} from 'native-base';

import PickerOrig from 'src/Components/Picker';

import {
  sg,
} from 'src/Styles';

import { picker as styles } from './styles';

class Picker extends Component {
  componentDidMount() {
    this.onInit(this.props);
  }

  componentDidUpdate(prevProp) {
    const { formData: formDataPrev } = prevProp;
    const { formData: formDataNow } = this.props;

    if (isNil(formDataPrev) && !isNil(formDataNow)) {
      this.onInit(this.props);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onInit(props) {
    const {
      onInit,
      formData,
      formKey,
      dataKey,
    } = props;

    if (
      onInit
      && formData
    ) {
      onInit(formKey, dataKey);
    }
  }

  onPressItem = (...args) => {
    const { onPressItem, formKey, dataKey } = this.props;

    this.Picker.closeList();
    if (onPressItem) {
      onPressItem(...args, formKey, dataKey);
    }
  }

  renderHelper() {
    const { helper } = this.props;

    if (isEmpty(helper)) {
      return null;
    }

    return (
      <Text style={styles.helperBl}>{helper}</Text>
    );
  }

  render() {
    const {
      renderItem,
      formData,
      formKey,
      label,
      labelGray,
      title,
      list,
      lineColor,
      containerStyle,
    } = this.props;

    let titleText = title;
    let error = false;
    const targetField = get(formData, formKey.split('.'));

    if (formData && !isNil(targetField)) {
      if (targetField.title) {
        titleText = targetField.title;
      }

      ({ error } = targetField);
    }

    if (isEmpty(formData)) {
      return null;
    }

    return (
      <View style={[sg.flex, sg.mB15]}>
        <Item
          error={error}
          style={[{ borderColor: lineColor }, sg.mB0, containerStyle]}
        >
          <PickerOrig
            ref={(ref) => {
              if (ref) this.Picker = ref;
            }}
            label={label}
            labelGray={labelGray}
            list={list}
            renderItem={renderItem}
            {...this.props}
            title={titleText}
            onPressItem={this.onPressItem}
          />
        </Item>
        {this.renderHelper()}
      </View>
    );
  }
}

Picker.defaultProps = {
  formData: null,
  formKey: '',
  dataKey: null,
  label: null,
  labelGray: false,
  title: null,
  list: [],
  onPressItem: null,
  onInit: null,
  containerStyle: {},
  lineColor: undefined,
  helper: '',
};

Picker.propTypes = {
  formData: PropTypes.object,
  formKey: PropTypes.string,
  dataKey: PropTypes.number,
  label: PropTypes.string,
  labelGray: PropTypes.bool,
  title: PropTypes.string,
  list: PropTypes.array,
  onPressItem: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  onInit: PropTypes.func,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  lineColor: PropTypes.string,
  helper: PropTypes.string,
};

export default Picker;
