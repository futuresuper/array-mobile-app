/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
} from 'react-native';
import {
  Svg,
  Circle,
  Polygon,
  Polyline,
  Path,
  Rect,
  G,
  Text,
} from 'react-native-svg';

import {
  sg,
} from 'src/Styles';

import AbstractChart from './AbstractChart';

class LineChart extends AbstractChart {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
    };

    this.buildPanResponder();
  }

  getColor = (dataset, opacity) => (dataset.color || this.getConfig().color)(opacity)
  getColorDot = () => (this.getConfig().colorDot || this.getColor())

  getStrokeWidth = dataset => dataset.strokeWidth || this.getConfig().strokeWidth || 3

  getDatas = data => data.reduce((acc, item) => (item.data ? [...acc, ...item.data] : acc), [])

  renderDots = (config) => {
    const { withDots, activeDot } = this.props;

    if (!withDots) {
      return null;
    }

    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
      paddingRight2,
      labels,
      label,
    } = config;
    const output = [];
    const datas = this.getDatas(data);
    const activeDotIndex = this.getActiveDotIndex();

    data.map((dataset) => {
      dataset.data.map((x, i) => {
        if (activeDot && activeDotIndex !== i) {
          return false;
        }

        const cx = paddingRight + (i * (width - paddingRight2)) / (dataset.data.length - 1);
        const cy = (height / this.heightDivider())
            * 3
            * (1 - (x - Math.min(...datas)) / this.calcScaler(datas))
          + paddingTop - 0.5;

        const events = this.getDotEvents();

        output.push(
          <Circle
            key={Math.random()}
            cx={cx}
            cy={cy}
            r="6"
            fill={this.getColorDot(dataset)}
            // onPress={onPress}
            // {...panHandlers}
            {...events}
          />,
          <Circle
            key={Math.random()}
            cx={cx}
            cy={cy}
            r="12"
            fill="#fff"
            fillOpacity={0}
            // onPress={onPress}
            // {...panHandlers}
            {...events}
          />,
        );

        if (labels && Array.isArray(labels) && labels.length && labels[i]) {
          const isLastLabel = (labels.length === (i + 1));
          const textAnchor = isLastLabel ? 'end' : 'start';
          const textCX = isLastLabel ? cx + 5 : cx - 5;

          output.push(
            <Text
              key={Math.random()}
              fill={label.color}
              fontSize={label.fontSize}
              x={textCX}
              y={cy - 17}
              textAnchor={textAnchor}
              height={label.fontSize}
              dy={label.fontSize * 0.3}
              fontFamily={label.fontFamily}
              fontWeight="bold"
            >
              {labels[i]}
            </Text>,
          );
        }

        return null;
      });

      return null;
    });

    return output;
  }

  renderShadow = (config) => {
    if (this.props.bezier) {
      return this.renderBezierShadow(config);
    }

    const {
      data,
      width,
      height,
      paddingRight,
      paddingTop,
    } = config;
    const output = [];
    const datas = this.getDatas(data);
    const baseHeight = this.calcBaseHeight(datas, height);
    config.data.map((dataset, index) => {
      output.push(
        <Polygon
          key={index.toString()}
          points={
            `${dataset.data
              .map(
                (d, i) => {
                  const x = paddingRight + (i * (width - paddingRight)) / dataset.data.length;
                  const y = (baseHeight - this.calcHeight(d, datas, height)) / this.heightDivider() * 3 + paddingTop;
                  return `${x},${y}`;
                },
              )
              .join(' ')
            } ${paddingRight
              + ((width - paddingRight) / dataset.data.length)
                * (dataset.data.length - 1)},${(height / this.heightDivider()) * 3
              + paddingTop} ${paddingRight},${(height / this.heightDivider()) * 3 + paddingTop}`
          }
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />,
      );

      return null;
    });

    return output;
  }

  renderLine = (config) => {
    const { renderLine } = this.props;

    if (!renderLine) {
      return null;
    }

    if (this.props.bezier) {
      return null;
      // return this.renderBezierLine(config);
    }

    const {
      width,
      height,
      paddingRight,
      paddingTop,
      data,
    } = config;
    const output = [];
    const datas = this.getDatas(data);
    const baseHeight = this.calcBaseHeight(datas, height);
    data.forEach((dataset, index) => {
      const points = dataset.data.map(
        (d, i) => {
          const x = (i * (width - paddingRight)) / dataset.data.length + paddingRight;
          const y = (baseHeight - this.calcHeight(d, datas, height)) / this.heightDivider() * 3 + paddingTop;
          return `${x},${y}`;
        },
      );

      output.push(
        <Polyline
          key={index.toString()}
          points={points.join(' ')}
          fill="none"
          stroke={this.getColor(dataset, 0.2)}
          strokeWidth={this.getStrokeWidth(dataset)}
        />,
      );
    });

    return output;
  }

  getBezierLinePoints = (dataset, config) => {
    const {
      width,
      height,
      paddingRight,
      paddingRight2,
      paddingTop,
      data,
    } = config;

    const res = {
      data: 'M0,0',
      lastX: 0,
      lastY: 0,
      firstX: 0,
      firstY: 0,
    };

    if (dataset.data.length === 0) {
      return res;
    }

    const datas = this.getDatas(data);
    const x = i => Math.floor(
      paddingRight + (i * (width - paddingRight2)) / (dataset.data.length - 1),
    );
    const baseHeight = this.calcBaseHeight(datas, height);
    const y = (i) => {
      const yHeight = this.calcHeight(dataset.data[i], datas, height);
      return Math.floor((baseHeight - yHeight) / this.heightDivider() * 3 + paddingTop);
    };

    res.firstX = x(0);
    res.firstY = y(0);

    res.data = [`M${res.firstX},${res.firstY}`]
      .concat(
        dataset.data.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const y_mid = (y(i) + y(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          const cp_x2 = (x_mid + x(i + 1)) / 2;

          res.lastX = x(i + 1);
          res.lastY = y(i + 1);

          return (
            `Q ${cp_x1}, ${y(i)}, ${x_mid}, ${y_mid}`
            + ` Q ${cp_x2}, ${y(i + 1)}, ${x(i + 1)}, ${y(i + 1)}`
          );
        }),
      ).join('');


    return res;
  }

  onLayout = (event) => {
    const { width } = event.nativeEvent.layout;

    this.setState({
      width,
    });
  };

  renderBezierLine = (config) => {
    const output = [];
    config.data.map((dataset, index) => {
      const result = this.getBezierLinePoints(dataset, config);

      output.push(
        <Path
          key={index.toString}
          d={result.data}
          fill="none"
          stroke={this.getColor(dataset, 0.2)}
          strokeWidth={this.getStrokeWidth(dataset)}
        />,
      );

      return null;
    });

    return output;
  }

  renderBezierShadow = (config) => {
    const { fillSides, fillBottom } = this.props;
    const {
      width,
      height,
      paddingRight,
      paddingRight2,
      paddingTop,
      data,
      graphBackgroundColor,
    } = config;
    const pathFill = graphBackgroundColor || 'url(#fillShadowGradient)';
    const output = [];
    const calcHeight = (height / this.heightDivider()) * 3 + paddingTop;
    let points = {};

    data.map((dataset, index) => {
      points = this.getBezierLinePoints(dataset, config);

      const d = `${points.data} L${paddingRight
          + ((width - paddingRight2) / (dataset.data.length - 1))
          * (dataset.data.length - 1)},${(height / this.heightDivider()) * 3
          + paddingTop} L${paddingRight},${calcHeight} Z`;

      output.push(
        <Path
          key={index.toString()}
          d={d}
          fill={pathFill}
          strokeWidth={0}
        />,
      );

      return null;
    });

    if (fillSides) {
      output.push(
        <Rect
          key={Math.random()}
          x={points.lastX}
          y={points.lastY}
          width={paddingRight2}
          height={calcHeight - points.lastY}
          fill={graphBackgroundColor}
          strokeWidth="0"
        />,
        <Rect
          key={Math.random()}
          x={0}
          y={points.firstY}
          width={paddingRight}
          height={calcHeight - points.firstY}
          fill={graphBackgroundColor}
          strokeWidth="0"
        />,
      );
    }

    if (fillBottom) {
      output.push(
        <Rect
          key={Math.random()}
          x={0}
          y={calcHeight - 0.5}
          width={width}
          height={height - calcHeight + 0.5}
          fill={graphBackgroundColor}
          strokeWidth="1"
        />,
      );
    }

    return output;
  }

  render() {
    const paddingTop = 26;
    const paddingRight = 6;
    const {
      height,
      data,
      withShadow = true,
      withInnerLines = false,
      withOuterLines = false,
      style = {},
      decorator,
      onDataPointClick,
    } = this.props;
    const {
      width,
    } = this.state;

    const chartConfig = this.getConfig();
    const { labels = [] } = data;
    const { borderRadius = 0 } = style;
    const config = {
      width,
      height,
    };
    const chartConfigMerged = {
      ...config,
      ...chartConfig,
    };

    const datas = this.getDatas(data.datasets);
    const rectFill = this.getBackgroundGradient();

    return (
      <View style={[sg.aSStretch, style]} onLayout={this.onLayout}>
        {width && (
          <Svg height={height} width={width}>
            <G>
              {this.renderDefs({
                ...config,
                ...chartConfig,
              })}
              <Rect
                width="100%"
                height={height}
                rx={borderRadius}
                ry={borderRadius}
                fill={rectFill}
              />
              <G>
                {withInnerLines
                  ? this.renderHorizontalLines({
                    ...config,
                    count: 4,
                    paddingTop,
                    paddingRight,
                  })
                  : withOuterLines
                    ? this.renderHorizontalLine({
                      ...config,
                      paddingTop,
                      paddingRight,
                    })
                    : null
                }
              </G>
              <G>
                {this.renderHorizontalLabels({
                  ...config,
                  count: Math.min(...datas) === Math.max(...datas) ? 1 : 4,
                  data: datas,
                  paddingTop,
                  paddingRight,
                })}
              </G>
              <G>
                {withInnerLines
                  ? this.renderVerticalLines({
                    ...config,
                    data: data.datasets[0].data,
                    paddingTop,
                    paddingRight,
                  })
                  : withOuterLines
                    ? this.renderVerticalLine({
                      ...config,
                      paddingTop,
                      paddingRight,
                    })
                    : null
                }
              </G>
              <G>
                {this.renderVerticalLabels({
                  ...config,
                  labels,
                  paddingRight,
                  paddingTop,
                })}
              </G>
              <G>
                {this.renderLine({
                  ...chartConfigMerged,
                  paddingRight,
                  paddingTop,
                  data: data.datasets,
                })}
              </G>
              <G>
                {withShadow
                  && this.renderShadow({
                    ...chartConfigMerged,
                    data: data.datasets,
                    paddingRight,
                    paddingTop,
                  })}
              </G>
              <G>
                {this.renderDots({
                  ...chartConfigMerged,
                  data: data.datasets,
                  labels,
                  paddingTop,
                  paddingRight,
                  onDataPointClick,
                })}
              </G>
              <G>
                {decorator
                  && decorator({
                    ...config,
                    data: data.datasets,
                    paddingTop,
                    paddingRight,
                  })}
              </G>
            </G>
          </Svg>
        )}
      </View>
    );
  }
}

export default LineChart;
