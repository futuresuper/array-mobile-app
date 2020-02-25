import React, { Component } from 'react';
import {
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  LinearGradient,
  Line,
  Text,
  Defs,
  Stop,
} from 'react-native-svg';
import _ from 'lodash';

import {
  sc,
} from 'src/Styles';

class AbstractChart extends Component {
  getConfig() {
    const { chartConfig } = this.props;

    const res = _.merge({
      graphBackgroundColor: sc.color.containerBgColor,
      backgroundColor: undefined,
      backgroundGradientFrom: undefined,
      backgroundGradientTo: undefined,
      decimalPlaces: 2,
      color: () => sc.color.containerBgColor,
      colorDot: sc.color.primary,
      label: {
        fontSize: 14,
        fontFamily: sc.font.medium,
        color: sc.color.dark3,
      },
      paddingRight2: 16,
    }, chartConfig);

    return res;
  }

  getData() {
    const { data } = this.props;

    if (!data.labels || !Array.isArray(data.labels)) {
      data.labels = [];
    }

    return data;
  }

  getActiveDotIndex() {
    const { activeDot } = this.props;
    const {
      labels,
    } = this.getData();
    let res = -1;

    if (activeDot) {
      res = labels.findIndex((item) => item === activeDot);
    }

    return res;
  }

  getNextDot() {
    let res;
    const activeDotIndex = this.getActiveDotIndex();

    if (activeDotIndex !== -1) {
      res = this.getDotInfoByLabelIndex(activeDotIndex + 1);
    }

    return res;
  }

  getPreviousDot() {
    let res;
    const activeDotIndex = this.getActiveDotIndex();

    if (activeDotIndex !== -1) {
      res = this.getDotInfoByLabelIndex(activeDotIndex - 1);
    }

    return res;
  }

  getDotInfoByLabelIndex(index) {
    const { labels, datasets } = this.getData();
    let res;

    if (labels[index]) {
      const data = datasets[0].data.find((item, i) => i === index);

      res = {
        index,
        label: labels[index],
        data,
      };
    }

    return res;
  }

  getDotEvents(...args) {
    const { onDataPointClick, onLeftSwipeDot, onRightSwipeDot } = this.props;
    let res = {};

    if (onDataPointClick) {
      res.onPress = () => {
        onDataPointClick(...args);
      };
    } else if (onLeftSwipeDot || onRightSwipeDot) {
      res = { ...this.PanResponder.panHandlers };
    }

    return res;
  }

  getBackgroundGradient() {
    const { setBackgroundGradient } = this.props;
    if (setBackgroundGradient) {
      return 'url(#backgroundGradient)';
    }

    return 'none';
  }

  calcScaler = (data) => {
    const { fromZero } = this.props;

    if (fromZero) {
      return Math.max(...data, 0) - Math.min(...data, 0) || 1;
    }

    return Math.max(...data) - Math.min(...data) || 1;
  }

  calcBaseHeight = (data, height) => {
    const min = Math.min(...data);
    const max = Math.max(...data);

    if (min >= 0 && max >= 0) {
      return height;
    // eslint-disable-next-line no-else-return
    } else if (min < 0 && max <= 0) {
      return 0;
    } else if (min < 0 && max > 0) {
      // eslint-disable-next-line no-mixed-operators
      return height * max / this.calcScaler(data);
    }

    return height;
  }

  calcHeight = (val, data, height) => {
    const { fromZero } = this.props;
    const max = Math.max(...data);
    const min = Math.min(...data);

    if (min < 0 && max > 0) {
      return height * (val / this.calcScaler(data));
    // eslint-disable-next-line no-else-return
    } else if (min >= 0 && max >= 0) {
      return fromZero
        ? height * (val / this.calcScaler(data))
        : height * ((val - min) / this.calcScaler(data));
    } else if (min < 0 && max <= 0) {
      return fromZero
        ? height * (val / this.calcScaler(data))
        : height * ((val - max) / this.calcScaler(data));
    }

    return height;
  }

  heightDivider = () => 4

  buildPanResponder() {
    const { onRightSwipeDot, onLeftSwipeDot } = this.props;

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const x = gestureState.dx;
        const y = gestureState.dy;

        if (Math.abs(x) > Math.abs(y)) {
          if (x >= 0) {
            onRightSwipeDot();
          } else {
            onLeftSwipeDot();
          }
        }
      },
    });
  }

  renderHorizontalLines = (config) => {
    const chartConfig = this.getConfig();
    const {
      count,
      width,
      height,
      paddingTop,
      paddingRight,
    } = config;

    return [...new Array(count)].map((__, i) => (
      <Line
        key={Math.random()}
        x1={paddingRight}
        y1={(height / this.heightDivider()) * i + paddingTop}
        x2={width}
        y2={(height / this.heightDivider()) * i + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    ));
  }

  renderHorizontalLine = (config) => {
    const chartConfig = this.getConfig();
    const {
      width,
      height,
      paddingTop,
      paddingRight,
    } = config;

    return (
      <Line
        key={Math.random()}
        x1={paddingRight}
        y1={height - height / this.heightDivider() + paddingTop}
        x2={width}
        y2={height - height / this.heightDivider() + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    );
  }

  renderHorizontalLabels = (config) => {
    const {
      yAxisLabel: yAxisLabelProps,
      fromZero,
      renderHorizontalLabels,
    } = this.props;

    const chartConfig = this.getConfig();

    if (!renderHorizontalLabels) {
      return null;
    }

    const {
      count,
      data,
      height,
      paddingTop,
      paddingRight,
      yLabelsOffset = 12,
    } = config;
    const decimalPlaces = chartConfig.decimalPlaces === undefined ? 2 : chartConfig.decimalPlaces;
    const yAxisLabel = yAxisLabelProps || '';

    return [...new Array(count)].map((__, i) => {
      let yLabel;

      if (count === 1) {
        yLabel = `${yAxisLabel}${data[0].toFixed(decimalPlaces)}`;
      } else {
        const label = fromZero
          ? (this.calcScaler(data) / (count - 1)) * i + Math.min(...data, 0)
          : (this.calcScaler(data) / (count - 1)) * i + Math.min(...data);
        yLabel = `${yAxisLabel}${label.toFixed(decimalPlaces)}`;
      }

      return (
        <Text
          key={Math.random()}
          x={paddingRight - yLabelsOffset}
          textAnchor="end"
          y={(height * 3) / 4 - ((height - paddingTop) / count) * i + 12}
          fontSize={12}
          fill={chartConfig.color(0.5)}
        >
          {yLabel}
        </Text>
      );
    });
  }

  renderVerticalLabels = (config) => {
    const { renderVerticalLabels } = this.props;
    if (!renderVerticalLabels) {
      return null;
    }

    const chartConfig = this.getConfig();
    const {
      labels = [],
      width,
      height,
      paddingRight,
      paddingTop,
      horizontalOffset = 0,
      stackedBar = false,
    } = config;
    const fontSize = 12;
    let fac = 1;
    if (stackedBar) {
      fac = 0.71;
    }

    return labels.map((label, i) => (
      <Text
        key={Math.random()}
        x={
          (((width - paddingRight) / labels.length) * i
            + paddingRight
            + horizontalOffset)
            * fac
        }
        y={(height * 3) / 4 + paddingTop + fontSize * 2}
        fontSize={fontSize}
        fill={chartConfig.color(0.5)}
        textAnchor="middle"
      >
        {label}
      </Text>
    ));
  }

  renderVerticalLines = (config) => {
    const chartConfig = this.getConfig();
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
    } = config;

    return [...new Array(data.length)].map((__, i) => (
      <Line
        key={Math.random()}
        x1={Math.floor(
          ((width - paddingRight) / data.length) * i + paddingRight,
        )}
        y1={0}
        x2={Math.floor(
          ((width - paddingRight) / data.length) * i + paddingRight,
        )}
        y2={height - height / this.heightDivider() + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    ));
  }

  renderVerticalLine = (config) => {
    const chartConfig = this.getConfig();
    const { height, paddingTop, paddingRight } = config;

    return (
      <Line
        key={Math.random()}
        x1={Math.floor(paddingRight)}
        y1={0}
        x2={Math.floor(paddingRight)}
        y2={height - height / this.heightDivider() + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    );
  }

  renderDefs = (config) => {
    const chartConfig = this.getConfig();
    const {
      width,
      height,
      backgroundGradientFrom,
      backgroundGradientTo,
    } = config;

    if (!backgroundGradientFrom || !backgroundGradientTo) {
      return null;
    }

    return (
      <Defs>
        <LinearGradient
          id="backgroundGradient"
          x1="0"
          y1={height}
          x2={width}
          y2={0}
        >
          <Stop offset="0" stopColor={backgroundGradientFrom} />
          <Stop offset="1" stopColor={backgroundGradientTo} />
        </LinearGradient>
        <LinearGradient
          id="fillShadowGradient"
          x1={0}
          y1={0}
          x2={0}
          y2={height}
        >
          <Stop
            offset="0"
            stopColor={chartConfig.color()}
            stopOpacity="0.1"
          />
          <Stop
            offset="1"
            stopColor={chartConfig.color()}
            stopOpacity="0"
          />
        </LinearGradient>
      </Defs>
    );
  }
}

AbstractChart.defaultProps = {
  fromZero: false,
  yAxisLabel: '',
  renderVerticalLabels: false,
  renderHorizontalLabels: false,
  renderLine: true,
  setBackgroundGradient: false,
  chartConfig: {},
  activeDot: undefined,
  onRightSwipeDot: null,
  onLeftSwipeDot: null,
  onDataPointClick: null,
  fillSides: false,
  fillBottom: false,
};

AbstractChart.propTypes = {
  chartConfig: PropTypes.object,
  fromZero: PropTypes.bool,
  yAxisLabel: PropTypes.string,
  renderVerticalLabels: PropTypes.bool,
  renderHorizontalLabels: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  renderLine: PropTypes.bool,
  setBackgroundGradient: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  activeDot: PropTypes.string,
  onRightSwipeDot: PropTypes.func,
  onLeftSwipeDot: PropTypes.func,
  onDataPointClick: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  fillSides: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  fillBottom: PropTypes.bool,
};

export default AbstractChart;
