
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  View,
  PanResponder,
} from 'react-native';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class BottomInfo extends Component {
  constructor(props) {
    super(props);

    this.isBounceHeightSet = false;

    this.state = {
      visibleState: false,
      bounceValue: new Animated.Value(0),
      height: 0,
    };

    this.buildPanResponder();
  }

  onClose() {
    const { onClose } = this.props;
    const { visibleState } = this.state;

    if (!visibleState && onClose) {
      onClose();
    }
  }

  setHeight = (event) => {
    const { height } = event.nativeEvent.layout;

    this.setState({
      height,
    });

    if (!this.isBounceHeightSet) {
      this.isBounceHeightSet = true;

      // eslint-disable-next-line react/destructuring-assignment
      this.state.bounceValue.setValue(-height);
    }
  }

  show() {
    const { animation } = this.props;

    if (animation) {
      this.toggleAnimation();
    } else {
      this.setState({
        visibleState: true,
      });
    }
  }

  toggleAnimation() {
    const { visibleState, bounceValue, height } = this.state;
    const finalValue = visibleState ? -height : 0;

    Animated.spring(
      bounceValue,
      {
        toValue: finalValue,
        bounciness: 0,
      },
    ).start();

    this.setState({
      visibleState: !visibleState,
    }, () => {
      this.onClose();
    });
  }

  buildPanResponder() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const x = gestureState.dx;
        const y = gestureState.dy;
        if (
          (Math.abs(x) <= Math.abs(y))
          && y >= 0
        ) {
          this.toggleAnimation();
        }
      },
    });
  }

  renderAnimation(children) {
    const { bounceValue } = this.state;

    return (
      <Animated.View
        style={[
          {
            marginBottom: bounceValue,
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  renderTopLine() {
    const { gesture } = this.props;
    let panHandlers = {};

    if (gesture) {
      panHandlers = { ...this.PanResponder.panHandlers };
    }

    return (
      <View
        style={styles.topLineBl}
        {...panHandlers}
      >
        <View style={styles.topLine} />
      </View>
    );
  }

  renderBody() {
    const { children, style } = this.props;
    const renderTopLine = this.renderTopLine();

    return (
      <View style={[styles.container, style]} onLayout={this.setHeight}>
        {renderTopLine}

        <View style={sg.flex}>
          {children}
        </View>
      </View>
    );
  }

  render() {
    const { animation, visible } = this.props;

    if (!animation && !visible) {
      return null;
    }

    let render = this.renderBody();

    if (animation) {
      render = this.renderAnimation(render);
    }

    return render;
  }
}

BottomInfo.defaultProps = {
  animation: true,
  gesture: true,
  visible: false,
  style: {},
  onClose: null,
};

BottomInfo.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.bool,
  gesture: PropTypes.bool,
  visible: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
};

export default BottomInfo;
