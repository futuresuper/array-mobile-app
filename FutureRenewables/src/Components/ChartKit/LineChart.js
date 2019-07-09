/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import {
  Svg,
  Circle,
  Polygon,
  Polyline,
  Path,
  Rect,
  G,
} from 'react-native-svg';
import AbstractChart from './AbstractChart';

class LineChart extends AbstractChart {
  constructor(props) {
    super(props);

    this.buildPanResponder();
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
          console.log('!!!ok', {  });
        }
      },
    });
  }

  getColor = (dataset, opacity) => (dataset.color || this.props.chartConfig.color)(opacity)

  getStrokeWidth = dataset => dataset.strokeWidth || this.props.chartConfig.strokeWidth || 3

  getDatas = data => data.reduce((acc, item) => (item.data ? [...acc, ...item.data] : acc), [])

  renderDots = (config) => {
    const panHandlers = { ...this.PanResponder.panHandlers };
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
      onDataPointClick,
    } = config;
    const output = [];
    const datas = this.getDatas(data);
    data.map((dataset) => {
      dataset.data.map((x, i) => {
        const cx = paddingRight + (i * (width - paddingRight)) / dataset.data.length;
        const cy = (height / 4)
            * 3
            * (1 - (x - Math.min(...datas)) / this.calcScaler(datas))
          + paddingTop;
        const onPress = () => {
          if (!onDataPointClick) {
            return;
          }

          onDataPointClick({
            value: x,
            dataset,
            getColor: opacity => this.getColor(dataset, opacity),
          });
        };

        output.push(
          <Circle
            key={Math.random()}
            cx={cx}
            cy={cy}
            r="4"
            fill={this.getColor(dataset, 0.9)}
            onPress={onPress}
          />,
          <Circle
            key={Math.random()}
            cx={cx}
            cy={cy}
            r="12"
            fill="#fff"
            fillOpacity={0}
            onPress={onPress}
            {...panHandlers}
          />,
        );

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

    const { data, width, height, paddingRight, paddingTop } = config;
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
                  const y = (baseHeight - this.calcHeight(d, datas, height)) / 4 * 3 + paddingTop;
                  return `${x},${y}`;
                },
              )
              .join(' ')
            } ${paddingRight
              + ((width - paddingRight) / dataset.data.length)
                * (dataset.data.length - 1)},${(height / 4) * 3
              + paddingTop} ${paddingRight},${(height / 4) * 3 + paddingTop}`
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
    if (this.props.bezier) {
      return this.renderBezierLine(config);
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
          const y = (baseHeight - this.calcHeight(d, datas, height)) / 4 * 3 + paddingTop;
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
    const {width, height, paddingRight, paddingTop, data} = config
    if (dataset.data.length === 0) {
      return 'M0,0'
    }

    const datas = this.getDatas(data);
    const x = i => Math.floor(
      paddingRight + (i * (width - paddingRight)) / dataset.data.length,
    );
    const baseHeight = this.calcBaseHeight(datas, height);
    const y = (i) => {
      const yHeight = this.calcHeight(dataset.data[i], datas, height);
      return Math.floor((baseHeight - yHeight) / 4 * 3 + paddingTop);
    };

    return [`M${x(0)},${y(0)}`]
      .concat(
        dataset.data.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const y_mid = (y(i) + y(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          const cp_x2 = (x_mid + x(i + 1)) / 2;
          return (
            `Q ${cp_x1}, ${y(i)}, ${x_mid}, ${y_mid}`
            + ` Q ${cp_x2}, ${y(i + 1)}, ${x(i + 1)}, ${y(i + 1)}`
          );
        }),
      )
      .join(' ');
  }

  renderBezierLine = (config) => {
    const output = [];
    config.data.map((dataset, index) => {
      const result = this.getBezierLinePoints(dataset, config);
      output.push(
        <Path
          key={index.toString}
          d={result}
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
    const {
      width,
      height,
      paddingRight,
      paddingTop,
      data,
    } = config;
    const output = [];
    data.map((dataset, index) => {
      const d = `${this.getBezierLinePoints(dataset, config)} L${paddingRight
          + ((width - paddingRight) / dataset.data.length)
          * (dataset.data.length - 1)},${(height / 4) * 3
          + paddingTop} L${paddingRight},${(height / 4) * 3 + paddingTop} Z`;

      output.push(
        <Path
          key={index.toString()}
          d={d}
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />,
      );

      return null;
    });

    return output;
  }

  render() {
    const paddingTop = 16;
    const paddingRight = 64;
    const {
      width,
      height,
      data,
      withShadow = true,
      withDots = true,
      withInnerLines = true,
      withOuterLines = true,
      style = {},
      decorator,
      onDataPointClick,
    } = this.props;
    const { labels = [] } = data;
    const { borderRadius = 0 } = style;
    const config = {
      width,
      height,
    };
    const datas = this.getDatas(data.datasets);
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          <G>
            {this.renderDefs({
              ...config,
              ...this.props.chartConfig,
            })}
            <Rect
              width="100%"
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              fill="url(#backgroundGradient)"
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
                ...config,
                paddingRight,
                paddingTop,
                data: data.datasets,
              })}
            </G>
            <G>
              {withShadow
                && this.renderShadow({
                  ...config,
                  data: data.datasets,
                  paddingRight,
                  paddingTop,
                })}
            </G>
            <G>
              {withDots
                && this.renderDots({
                  ...config,
                  data: data.datasets,
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
      </View>
    );
  }
}

export default LineChart;
