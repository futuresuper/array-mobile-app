
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Item,
} from 'native-base';

import PickerOrig from 'src/Components/Picker';

import {
  sg,
} from 'src/Styles';

class Picker extends Component {
  componentDidMount() {
    this.onInit(this.props);
  }

  componentDidUpdate(prevProp) {
    const { formData: formDataPrev } = prevProp;
    const { formData: formDataNow } = this.props;

    if (_.isNil(formDataPrev) && !_.isNil(formDataNow)) {
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

    console.log('!!!asd', this.props);
    this.Picker.closeList();
    if (onPressItem) {
      onPressItem(...args, formKey, dataKey);
    }
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

    if (formData && !_.isNil(formData[formKey])) {
      if (formData[formKey].title) {
        titleText = formData[formKey].title;
      }

      ({ error } = formData[formKey]);
    }

    return (
      <Item
        error={error}
        style={[{ borderColor: lineColor }, sg.mB15, containerStyle]}
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
};

export default Picker;
