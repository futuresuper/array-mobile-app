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
import _ from 'lodash';

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

  setNextDot() {
    console.log('!!!next', { });
  }

  setPreviousDot() {
    console.log('!!!previous', {  });
  }

  onRightSwipeDot() {
    this.setNextDot();
  }

  onLeftSwipeDot() {
    this.setPreviousDot();
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

    const panHandlers = { ...this.PanResponder.panHandlers };
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
      onDataPointClick,
      labels,
      label,
    } = config;
    const output = [];
    const datas = this.getDatas(data);
    let activeDotIndex = -1;

    if (activeDot) {
      activeDotIndex = labels.findIndex(item => item === activeDot);
    }


    console.log('!!!', { config, datas, activeDot });

    data.map((dataset) => {
      dataset.data.map((x, i) => {
        if (activeDot && activeDotIndex !== i) {
          return false;
        }

        const cx = paddingRight + (i * (width - paddingRight)) / dataset.data.length;
        const cy = (height / this.heightDivider())
            * 3
            * (1 - (x - Math.min(...datas)) / this.calcScaler(datas))
          + paddingTop - 0.5;

        const events = this.getDotEvents();
        // const onPress = () => {
        //   if (!onDataPointClick) {
        //     return;
        //   }

        //   onDataPointClick({
        //     value: x,
        //     dataset,
        //     getColor: opacity => this.getColor(dataset, opacity),
        //   });
        // };

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
      paddingTop,
      data,
    } = config;

    if (dataset.data.length === 0) {
      return 'M0,0';
    }

    const datas = this.getDatas(data);
    const x = i => Math.floor(
      paddingRight + (i * (width - paddingRight)) / dataset.data.length,
    );
    const baseHeight = this.calcBaseHeight(datas, height);
    const y = (i) => {
      const yHeight = this.calcHeight(dataset.data[i], datas, height);
      return Math.floor((baseHeight - yHeight) / this.heightDivider() * 3 + paddingTop);
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
      graphBackgroundColor,
    } = config;
    const pathFill = graphBackgroundColor || 'url(#fillShadowGradient)';
    const output = [];

    data.map((dataset, index) => {
      const d = `${this.getBezierLinePoints(dataset, config)} L${paddingRight
          + ((width - paddingRight) / dataset.data.length)
          * (dataset.data.length - 1)},${(height / this.heightDivider()) * 3
          + paddingTop} L${paddingRight},${(height / this.heightDivider()) * 3 + paddingTop} Z`;

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

    return output;
  }

  render() {
    const paddingTop = 26;
    const paddingRight = 6;
    const {
      height,
      data,
      withShadow = true,
      withDots = true,
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
      width: width / 0.887,
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
                  ...config,
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
