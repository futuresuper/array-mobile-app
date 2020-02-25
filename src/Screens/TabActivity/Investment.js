import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
} from 'react-native';
import {
  View,
  Text,
  Icon,
  Grid,
  Row,
  Col,
} from 'native-base';

import Image from 'src/Components/Image';
import {
  PieChart,
} from 'src/Components/ChartKit';
import deviceUtils from 'src/Common/device';

import { sg } from 'src/Styles';

import SunDark from 'src/assets/images/SunDark.png';
import HeartDark from 'src/assets/images/HeartDark.png';

const screenWidth = deviceUtils.screenWidth();

class Investment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChartSlice: null,
    };
  }

  renderActiveChartSlice() {
    const { selectedChartSlice } = this.state;

    if (!selectedChartSlice) {
      return null;
    }

    return (
      <View style={[sg.row, sg.contentPadding]}>
        <Grid>
          <Col>
            <Text style={[sg.fS20, sg.textBold]}>Ratesseter</Text>
            <Text style={[sg.textBold]}>(Ratesseter)</Text>

            <Text style={[sg.fS15, sg.textBold, sg.mT10]}>asdasdasdasd</Text>
          </Col>
          <Col style={sg.flexNull}>
            <Text style={[sg.fS20, sg.textBold]}>12%</Text>
          </Col>
        </Grid>
      </View>
    );
  }

  renderChart() {
    const data = [
      {
        name: "Seoul",
        population: 21500000,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Toronto",
        population: 2800000,
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
    ];

    return (
      <View style={sg.mT20}>
        <View style={[sg.row, sg.aSCenter, sg.aICenter, sg.mB10]}>
          <Icon type="MaterialIcons" name="touch-app" />
          <Text style={[sg.textBold]}>Tap to find out more</Text>
        </View>

        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={0}
          absolute
          hasLegend={false}
          onPress={(item) => {
            this.setState({
              selectedChartSlice: item,
            });
          }}
          activeSlice={({ name }) => name === 'Toronto'}
        />

        {this.renderActiveChartSlice()}
      </View>
    );
  }

  renderTitleCol(image, number, text) {
    return (
      <View style={[sg.aICenter]}>
        {image}
        <Text style={[sg.textBold, sg.fS25, sg.mT5, sg.mB5]}>{number}</Text>
        <Text style={[sg.textBold, sg.fS15]}>{text}</Text>
      </View>
    );
  }

  renderTitle() {
    return (
      <View style={[sg.row, sg.mB10]}>
        <Grid>
          <Col style={[sg.aIEnd]}>
            {this.renderTitleCol(
              <Image source={SunDark} style={sg.tintColorOrange} />,
              '58%',
              'Renewables',
            )}
          </Col>
          <Col style={[sg.flexNull, sg.borderRight, sg.borderColorGray, sg.mH30]} />
          <Col style={sg.aIStart}>
            {this.renderTitleCol(
              <Image source={HeartDark} style={sg.tintColorPrimary} />,
              '42%',
              'Ethical',
            )}
          </Col>
        </Grid>
      </View>
    );
  }

  renderTableData() {
    const {
      screenProps,
      selectedAccount: { balanceIncludingPendingInDollars },
    } = this.props;
    const theme = screenProps.getTheme();

    const data = [
      {
        name: 123,
        subCategory: 'Solar Farm',
        percent: 28,
      },
      {
        name: 123,
        subCategory: 'asd',
        percent: 12,
      },
    ];

    return (
      <View style={[sg.contentPadding2]}>
        <Text style={[sg.textCenter, sg.fS23, sg.textBold, sg.mB20]}>Breakdown</Text>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            const {
              name,
              subCategory,
              percent,
            } = item;
            const isSunIcon = (subCategory === 'Solar Farm' || subCategory === 'Renewables Lending');
            const icon = {
              source: isSunIcon ? SunDark : HeartDark,
              style: [sg.height16, sg.tintColorGray11],
            };
            const calcValue = balanceIncludingPendingInDollars * percent;

            return (
              <Grid style={[sg.borderColor(theme.borderColorList), sg.borderBottom, (index === 0 ? sg.borderTop : {})]}>
                <Row style={[sg.pV20, sg.pL10]}>
                  <Col style={[sg.aICenter, sg.flexNull, sg.width30]}>
                    <Image source={icon.source} style={icon.style} resizeMode="contain" />
                  </Col>
                  <Col style={[sg.mL20, sg.mR20]}>
                    <Text style={[sg.fS14, sg.textBold]}>{name}</Text>
                    <Text style={[sg.fS14, sg.mT10]}>{name}</Text>
                  </Col>
                  <Col style={[sg.flexNull]}>
                    <Text style={[sg.fS14, sg.fontMedium, sg.colorGray11]}>{`${percent}%`}</Text>
                  </Col>
                  <Col style={[sg.mL10, sg.flexNull, sg.aIRight, sg.width80]}>
                    <Text style={[sg.fS14, sg.fontMedium, sg.colorGray11]}>{`$${calcValue}`}</Text>
                  </Col>
                </Row>
              </Grid>
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={sg.mB20}>
        <View style={[sg.mH0, sg.mT15]}>
          {this.renderTitle()}
          {this.renderChart()}
          {this.renderTableData()}
        </View>
        {/* <TouchableOpacity
          style={[styles.allInvestHeader, sg.borderColor(theme.borderColorList)]}
          onPress={() => {
            screenProps.navigateTo(routeNames.ALL_INVESTMENTS);
          }}
        >
          <Text style={[sg.fontMedium]}>See all investments</Text>
          <Icon name="ios-arrow-forward" style={[sg.fS20]} />
        </TouchableOpacity> */}
      </View>
    );
  }
}

Investment.propTypes = {
  selectedAccount: PropTypes.object.isRequired,
};

export default Investment;
