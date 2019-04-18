
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {
  Text,
  Label,
  Icon,
  Col,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const TOUCHABLE_ELEMENTS = {
  TouchableHighlight: 'TouchableHighlight',
  TouchableOpacity: 'TouchableOpacity',
  TouchableWithoutFeedback: 'TouchableWithoutFeedback',
  TouchableNativeFeedback: 'TouchableNativeFeedback',
  Button: 'Button',
};

class Picker extends Component {
  constructor(props) {
    super(props);

    this._button = null;
    this._buttonFrame = null;

    this.state = {
      showList: false,
      title: null,
    };
  }

  setTitle(title) {
    this.setState({
      title,
    });
  }

  openList = () => {
    this.updatePosition(() => {
      this.setState({
        showList: true,
      });
    });
  }

  closeList = () => {
    this.setState({
      showList: false,
    });
  }

  onRequestClose = () => {
    this.closeList();
  };

  onModalPress = () => {
    this.closeList();
  };

  updatePosition(callback) {
    if (this._button && this._button.measure) {
      this._button.measure((fx, fy, width, height, px, py) => {
        this._buttonFrame = {
          x: px,
          y: py,
          w: width,
          h: height,
        };

        if (callback) {
          callback();
        }
      });
    }
  }

  calcPosition() {
    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;

    const dropdownHeight = StyleSheet.flatten(styles.listSubBl).height;

    const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
    const rightSpace = windowWidth - this._buttonFrame.x;
    const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
    const showInLeft = rightSpace >= this._buttonFrame.x;

    const positionStyle = {
      height: dropdownHeight,
      top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
    };

    if (showInLeft) {
      positionStyle.left = this._buttonFrame.x;
    } else {
      const dropdownWidth = -1;
      if (dropdownWidth !== -1) {
        positionStyle.width = dropdownWidth;
      }
      positionStyle.right = rightSpace - this._buttonFrame.w;
    }

    return positionStyle;
  }

  renderItem = (...args) => {
    const { renderItem } = this.props;
    const { index } = args[0];
    let { onPressItem } = this.props;
    let res = renderItem(...args);

    if (typeof res.props.onPress === 'function') {
      onPressItem = res.props.onPress;
    }

    if (!Object.keys(TOUCHABLE_ELEMENTS).find(itemEl => res.type.displayName.includes(TOUCHABLE_ELEMENTS[itemEl]))) {
      res = (
        <TouchableOpacity
          onPress={() => {
            onPressItem(...args);
          }}
          style={styles.listItemTouch}
        >
          {res}
        </TouchableOpacity>
      );
    }

    res = (
      <View style={[styles.listItemBl, (index > 0) ? styles.listItemBlBorder : {}]}>
        {res}
      </View>
    );

    return res;
  }

  renderList() {
    const { list } = this.props;

    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
        style={{
          width: '100%',
        }}
      />
    );
  }

  render() {
    const {
      label,
      labelGray,
      title,
      list,
    } = this.props;
    const {
      showList,
      title: titleState,
    } = this.state;

    return (
      <Col style={styles.container}>
        {(label && (label !== '')) && <Label style={[styles.label, (labelGray ? sg.colorGray : {})]}>{label}</Label>}
        <TouchableOpacity
          accessible
          style={styles.titleBl}
          onPress={this.openList}
          ref={(button) => {
            this._button = button;
          }}
        >
          <Col>
            <Text style={styles.title}>{titleState || title}</Text>
          </Col>
          <Icon name="ios-arrow-down" style={styles.icon} />
        </TouchableOpacity>
        {showList && list.length && (
          <Modal
            animationType="fade"
            visible
            transparent
            onRequestClose={this.onRequestClose}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
          >
            <TouchableWithoutFeedback
              accessible
              disabled={!showList}
              onPress={this.onModalPress}
            >

              <View style={styles.listBl}>
                <View style={[styles.listSubBl, this.calcPosition()]}>
                  {this.renderList()}
                </View>
              </View>

            </TouchableWithoutFeedback>
          </Modal>

        )}
      </Col>
    );
  }
}

Picker.defaultProps = {
  label: null,
  labelGray: false,
  title: '',
  list: [],
  renderItem: () => null,
  onPressItem: () => null,
};

Picker.propTypes = {
  label: PropTypes.string,
  labelGray: PropTypes.bool,
  title: PropTypes.string,
  list: PropTypes.array,
  renderItem: PropTypes.func,
  onPressItem: PropTypes.func,
};

export default Picker;
