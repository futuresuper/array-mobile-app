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
    const { investmentsChart } = this.props;
    const { selectedChartSlice } = this.state;

    if (!selectedChartSlice) {
      return null;
    }

    const data = investmentsChart.find((item) => (item.PK2 === selectedChartSlice));

    const {
      name,
      subName,
      description,
      value,
    } = data.itemData;

    return (
      <View style={[sg.row, sg.contentPadding]}>
        <Grid>
          <Col>
            <Text style={[sg.fS20, sg.textBold]}>{name}</Text>
            {subName && <Text style={[sg.textBold, sg.mT5]}>{`(${subName})`}</Text>}

            {description && <Text style={[sg.fS15, sg.textBold, sg.mT10]}>{description}</Text>}
          </Col>
          <Col style={sg.flexNull}>
            <Text style={[sg.fS20, sg.textBold]}>{`${value}%`}</Text>
          </Col>
        </Grid>
      </View>
    );
  }

  renderChart() {
    const { investmentsChart } = this.props;
    const { selectedChartSlice } = this.state;

    const data = investmentsChart.map(({
      itemData: {
        name, value, color,
      },
      PK2,
    }) => ({
      name,
      population: parseInt(value, 10),
      color,
      PK2,
    }));

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
          onPress={({ PK2 }) => {
            this.setState({
              selectedChartSlice: PK2,
            });
          }}
          activeSlice={({ PK2 }) => PK2 === selectedChartSlice}
        />

        {this.renderActiveChartSlice()}
      </View>
    );
  }

  renderTitleCol(image, number, text) {
    return (
      <View style={[sg.aICenter]}>
        {image}
        <Text style={[sg.textBold, sg.fS25, sg.mT5, sg.mB5]}>{`${number}%`}</Text>
        <Text style={[sg.textBold, sg.fS15]}>{text}</Text>
      </View>
    );
  }

  renderTitle() {
    const { investmentsChart } = this.props;
    let renewables = 0;
    let ethical = 0;

    investmentsChart.forEach(({ itemData }) => {
      const { isRenewable, isEthical, value } = itemData;

      if (isRenewable) {
        renewables += parseInt(value, 10);
      } else if (isEthical) {
        ethical += parseInt(value, 10);
      }
    });

    return (
      <View style={[sg.row, sg.mB10]}>
        <Grid>
          <Col style={[sg.aIEnd]}>
            {this.renderTitleCol(
              <Image source={SunDark} style={sg.tintColorOrange} />,
              renewables,
              'Renewables',
            )}
          </Col>
          <Col style={[sg.flexNull, sg.borderRight, sg.borderColorGray, sg.mH30]} />
          <Col style={sg.aIStart}>
            {this.renderTitleCol(
              <Image source={HeartDark} style={sg.tintColorPrimary} />,
              ethical,
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
      investmentsChart,
    } = this.props;
    const theme = screenProps.getTheme();

    return (
      <View style={[sg.contentPadding2]}>
        <Text style={[sg.textCenter, sg.fS23, sg.textBold, sg.mB20]}>Breakdown</Text>

        <FlatList
          data={investmentsChart}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item: { itemData }, index }) => {
            const {
              name,
              value,
              isRenewable,
              isEthical,
              subList = [],
            } = itemData;
            const icon = {
              source: null,
              style: [sg.height16, sg.tintColorGray11],
            };
            const calcValue = balanceIncludingPendingInDollars * parseInt(value, 10);

            if (isRenewable) {
              icon.source = SunDark;
            } else if (isEthical) {
              icon.source = HeartDark;
            }

            return (
              <Grid style={[sg.borderColor(theme.borderColorList), sg.borderBottom, (index === 0 ? sg.borderTop : {}), sg.pV20]}>
                <Row style={[sg.pL10]}>
                  <Col style={[sg.aICenter, sg.flexNull, sg.width30]}>
                    <Image source={icon.source} style={icon.style} resizeMode="contain" />
                  </Col>
                  <Col style={[sg.mL20, sg.mR20]}>
                    <Text style={[sg.fS14, sg.textBold]}>{name}</Text>
                  </Col>
                  <Col style={[sg.flexNull]}>
                    <Text style={[sg.fS14, sg.fontMedium, sg.colorGray11]}>{`${value}%`}</Text>
                  </Col>
                  <Col style={[sg.mL10, sg.flexNull, sg.aIRight, sg.width80]}>
                    <Text style={[sg.fS14, sg.fontMedium, sg.colorGray11]}>{`$${calcValue}`}</Text>
                  </Col>
                </Row>
                <Row style={[sg.pL10]}>
                  <Col style={[sg.aICenter, sg.flexNull, sg.width30]} />

                  <Col style={[sg.mL20]}>
                    {subList.map((itemSubList, indexSubList) => (
                      <Text
                        key={indexSubList.toString()}
                        style={[sg.fS14, sg.mT10]}
                      >
                        {itemSubList}
                      </Text>
                    ))}
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
    const { investmentsChart } = this.props;

    if (!investmentsChart) {
      return null;
    }

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
  investmentsChart: PropTypes.array.isRequired,
};

export default Investment;
