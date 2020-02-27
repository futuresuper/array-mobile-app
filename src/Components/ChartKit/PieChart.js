/* eslint-disable operator-linebreak */
import React from 'react';
import { View } from 'react-native';
import {
  Svg,
  Rect,
  Text,
  G,
  Path,
} from 'react-native-svg';

import AbstractChart from './AbstractChart';

const Pie = require('paths-js/pie');

class PieChart extends AbstractChart {
  render() {
    const { onPress, activeSlice } = this.props;

    const {
      style = {},
      backgroundColor,
      absolute = false,
      hasLegend = true,
    } = this.props;
    const { borderRadius = 0 } = style;
    const chart = Pie({
      center: this.props.center || [0, 0],
      r: 0,
      R: this.props.height / 2.1,
      data: this.props.data,
      accessor: (x) => x[this.props.accessor],
    });
    const total = this.props.data.reduce((sum, item) => sum + item[this.props.accessor], 0);
    const slices = chart.curves.map((c, i) => {
      const isActiveSlice = activeSlice(c.item);
      const strokeWidth = isActiveSlice ? 1 : 0;
      let value;

      if (absolute) {
        value = c.item[this.props.accessor];
      } else {
        // eslint-disable-next-line no-lonely-if
        if (total === 0) {
          value = 0;
        } else {
          value = Math.round((100 / total) * c.item[this.props.accessor]);
        }

        value = `${value}%`;
      }

      return (
        <G key={Math.random()}>
          <Path
            d={c.sector.path.print()}
            fill={c.item.color}
            strokeWidth={strokeWidth}
            stroke="black"
            onPress={() => onPress(c.item)}
          />

          {hasLegend ? (
            <Rect
              width="16px"
              height="16px"
              fill={c.item.color}
              rx={8}
              ry={8}
              x={this.props.width / 2.1 - 24}
              y={
                -(this.props.height / 2.1) + ((this.props.height * 0.8) / this.props.data.length) * i + 12
              }
            />
          ) : null}
          {hasLegend ? (
            <Text
              fill={c.item.legendFontColor}
              fontSize={c.item.legendFontSize}
              x={this.props.width / 2.1}
              y={
                -(this.props.height / 2.1) +
                ((this.props.height * 0.8) / this.props.data.length) * i +
                12 * 2
              }
            >
              {`${value} ${c.item.name}`}
            </Text>
          ) : null}
        </G>
      );
    });
    return (
      <View
        style={[
          {
            width: this.props.width,
            height: this.props.height,
            padding: 0,
          },
          style,
        ]}
      >
        <Svg width={this.props.width} height={this.props.height}>
          <G>
            {this.renderDefs({
              width: this.props.height,
              height: this.props.height,
              ...this.props.chartConfig,
            })}
          </G>
          <Rect
            width="100%"
            height={this.props.height}
            rx={borderRadius}
            ry={borderRadius}
            fill={backgroundColor}
          />
          <G
            x={
              this.props.width / 2
            }
            y={this.props.height / 2}
          >
            {slices}
          </G>
        </Svg>
      </View>
    );
  }
}

export default PieChart;
