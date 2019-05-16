
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  Animated,
  View,
} from 'react-native';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class BottomInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleState: false,
      bounceValue: new Animated.Value(0),
      height: 0,
    };
  }

  setHeight = (event) => {
    const { height } = event.nativeEvent.layout;

    this.setState({
      height,
    });

    // eslint-disable-next-line react/destructuring-assignment
    this.state.bounceValue.setValue(-height);
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
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderGesture(children) {
    return (
      <PanGestureHandler
        activeOffsetY={[-10, 10]}
        onGestureEvent={() => {
          this.toggleAnimation();
        }}
      >
        {children}
      </PanGestureHandler>
    );
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

  // eslint-disable-next-line class-methods-use-this
  renderTopLine() {
    return (
      <View style={styles.topLineBl}>
        <View style={styles.topLine} />
      </View>
    );
  }

  renderBody() {
    const { children, gesture, style } = this.props;
    let renderTopLine = this.renderTopLine();

    if (gesture) {
      renderTopLine = this.renderGesture(renderTopLine);
    }

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
};

BottomInfo.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.bool,
  gesture: PropTypes.bool,
  visible: PropTypes.bool,
  style: PropTypes.object,
};

export default BottomInfo;
