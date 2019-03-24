
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';

function percentToDegrees(percent) {
  return percent * 3.6;
}

class CircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialStateFromProps(nextProps));
  }

  // eslint-disable-next-line class-methods-use-this
  getInitialStateFromProps(props) {
    const percent = Math.max(Math.min(100, props.percent), 0);
    const needHalfCircle2 = percent > 50;
    let halfCircle1Degree;
    let halfCircle2Degree;
    // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
    if (needHalfCircle2) {
      halfCircle1Degree = 180;
      halfCircle2Degree = percentToDegrees(percent);
    } else {
      halfCircle1Degree = percentToDegrees(percent);
      halfCircle2Degree = 0;
    }

    return {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles: {
        // when the second half circle is not needed, we need it to cover
        // the negative degrees of the first circle
        backgroundColor: needHalfCircle2
          ? props.color
          : props.shadowColor,
      },
    }
  }

  renderHalfCircle(rotateDegrees, halfCircleStyles = {}, hz = true) {
    let { radius, color } = this.props;
    let styleLeftWrap = {
      top: 0,
      left: 0,
    };
    let styleHalfCircle = {};
    // let radius2 = radius;
    // const width2 = radius2 + 0;
    // const height2 = (radius2 + 0) * 2;

    //   radius = radius + 10;
    //   styleLeftWrap.top = -10;
    //   styleLeftWrap.left = -10;
    // if (hz) {
    //   // styleHalfCircle.backgroundColor = 'red';
    // } else {
    //   // radius2 = radius + 10;
    //   // color = 'red';
    //   styleHalfCircle.backgroundColor = 'white';
    // }
    const width = radius + 0;
    const height = (radius + 0) * 2;

    return (
      <View
        style={[
          styles.leftWrap,
          styleLeftWrap,
          {
            width: width - 0 + 0,
            height: height - 0,
          },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              width: width + 0,
              height: height + 0,
              borderRadius: radius,
              overflow: 'hidden',
              transform: [
                { translateX: radius / 2 },
                { rotate: `${rotateDegrees}deg` },
                { translateX: -radius / 2 },
              ],
              backgroundColor: color,
              ...halfCircleStyles,
            },
            styleHalfCircle,
          ]}
        />
        {/* {!hz
          && (
            <View
              style={[
                styles.halfCircle,
                {
                  width: width2 + 0,
                  height: height2 + 0,
                  borderRadius: radius2,
                  overflow: 'hidden',
                  transform: [
                    { translateX: radius2 / 2 },
                    { rotate: `${rotateDegrees}deg` },
                    { translateX: -radius2 / 2 },
                  ],
                  backgroundColor: color,
                  ...halfCircleStyles,
                },
                // styleHalfCircle,
              ]}
            />
          )
        } */}
      </View>
    )
  }

  renderInnerCircle() {
    const {
      radius,
      borderWidth,
      bgColor,
      containerStyle,
      children,
    } = this.props;
    const radiusMinusBorder = radius - borderWidth;
    return (
      <View
        style={[
          styles.innerCircle,
          {
            width: radiusMinusBorder * 2,
            height: radiusMinusBorder * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: bgColor,
            ...containerStyle,
          },
        ]}
      >
        {children}
      </View>
    );
  }

  render() {
    const {
      radius,
      shadowColor,
      outerCircleStyle,
    } = this.props;
    const {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles,
    } = this.state;

    return (
      <View
        style={[
          styles.outerCircle,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: shadowColor,
            ...outerCircleStyle,
          },
        ]}
      >
        {/* <View
          style={[
            styles.hz,
            {
              width: (radius + 5) * 2,
              height: (radius + 5) * 2,
              borderRadius: radius + 5,
              // backgroundColor: 'red',
            },
          ]}
        /> */}

        {this.renderHalfCircle(halfCircle1Degree)}
        {this.renderHalfCircle(halfCircle2Degree, halfCircle2Styles, false)}
        {this.renderInnerCircle()}
      </View>
    );
  }
}

CircularProgress.defaultProps = {
  color: '#f00',
  shadowColor: '#999',
  bgColor: '#e9e9ef',
  borderWidth: 2,
  children: null,
  containerStyle: {},
  outerCircleStyle: {},
  progressWidth: 10,
};

CircularProgress.propTypes = {
  color: PropTypes.string,
  shadowColor: PropTypes.string,
  bgColor: PropTypes.string,
  radius: PropTypes.number.isRequired,
  borderWidth: PropTypes.number,
  percent: PropTypes.number.isRequired,
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  progressWidth: PropTypes.number,
};


export default CircularProgress;
