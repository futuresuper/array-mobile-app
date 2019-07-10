import React, { Component } from 'react';
import {
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  LinearGradient,
  Line,
  Text,
  Defs,
  Stop,
} from 'react-native-svg';

class AbstractChart extends Component {
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

  getBackgroundGradient() {
    const { setBackgroundGradient } = this.props;
    if (setBackgroundGradient) {
      return 'url(#backgroundGradient)';
    }

    return 'none';
  }

  renderHorizontalLines = (config) => {
    const { chartConfig } = this.props;
    const {
      count,
      width,
      height,
      paddingTop,
      paddingRight,
    } = config;

    return [...new Array(count)].map((_, i) => (
      <Line
        key={Math.random()}
        x1={paddingRight}
        y1={(height / 4) * i + paddingTop}
        x2={width}
        y2={(height / 4) * i + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    ));
  }

  renderHorizontalLine = (config) => {
    const { chartConfig } = this.props;
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
        y1={height - height / 4 + paddingTop}
        x2={width}
        y2={height - height / 4 + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    );
  }

  renderHorizontalLabels = (config) => {
    const {
      chartConfig,
      yAxisLabel: yAxisLabelProps,
      fromZero,
      renderHorizontalLabels,
    } = this.props;

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

    return [...new Array(count)].map((_, i) => {
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
    const { chartConfig, renderVerticalLabels } = this.props;
    if (!renderVerticalLabels) {
      return null;
    }

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
    const { chartConfig } = this.props;
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
    } = config;

    return [...new Array(data.length)].map((_, i) => (
      <Line
        key={Math.random()}
        x1={Math.floor(
          ((width - paddingRight) / data.length) * i + paddingRight,
        )}
        y1={0}
        x2={Math.floor(
          ((width - paddingRight) / data.length) * i + paddingRight,
        )}
        y2={height - height / 4 + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    ));
  }

  renderVerticalLine = (config) => {
    const { chartConfig } = this.props;
    const { height, paddingTop, paddingRight } = config;

    return (
      <Line
        key={Math.random()}
        x1={Math.floor(paddingRight)}
        y1={0}
        x2={Math.floor(paddingRight)}
        y2={height - height / 4 + paddingTop}
        stroke={chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    );
  }

  renderDefs = (config) => {
    const { chartConfig } = this.props;
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
  setBackgroundGradient: false,
};

AbstractChart.propTypes = {
  chartConfig: PropTypes.object.isRequired,
  fromZero: PropTypes.bool,
  yAxisLabel: PropTypes.string,
  renderVerticalLabels: PropTypes.bool,
  renderHorizontalLabels: PropTypes.bool,
  setBackgroundGradient: PropTypes.bool,
};

export default AbstractChart;
