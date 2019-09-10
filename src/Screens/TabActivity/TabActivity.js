import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Image, Dimensions } from 'react-native';

import { Button, Text, Content } from 'native-base';

import { accountsSelector } from 'src/Redux/AppContent';

import Br from 'src/Components/Br';
import BottomInfo from 'src/Components/BottomInfo';
import Balance from 'src/Components/Balance';
import moment from 'src/Common/moment';
import SunGlow from 'src/Components/SunGlow';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit';
import { LineChart } from 'src/Components/ChartKit';

import GraphExample2 from 'src/assets/images/GraphExample2.png';

import { sg } from 'src/Styles';
import styles from './styles';

import Perfomance from './Perfomance';
import Investment from './Investment';

class TabActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: moment().format(),
      segment: {
        isPerfomance: true,
        isInvestment: false,
      },
      activeDot: 'Mar 8',
      activeBalance: 0,
    };
  }

  setPerfomanceSegment = () => {
    this.setState({
      segment: {
        isPerfomance: true,
        isInvestment: false,
      },
    });
  };

  setInvestmentSegment = () => {
    this.setState({
      segment: {
        isPerfomance: false,
        isInvestment: true,
      },
    });
  };

  renderGlow() {
    const { currentTime } = this.state;

    return <SunGlow currentTime={currentTime} style={styles.activityCircleDay} {...this.props} />;
  }

  renderChart() {
    const { screenProps } = this.props;
    const { activeDot } = this.state;
    const theme = screenProps.getTheme();
    return (
      <View style={[sg.contentMarginH2]}>
        <View style={[styles.activityChartBl, sg.aICenter]}>
          <Image source={GraphExample2} style={styles.activityGraphExample} />
          {/* <LineChart
            data={{
              labels: ['March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          /> */}
          {this.renderGlow()}
          {/* <LineChart
            ref={c => {
              if (c) this.LineChart = c;
            }}
            data={{
              labels: ['Mar 31', 'Apr 30', 'May 31', 'Jun 30'],
              datasets: [
                {
                  data: [10, 12, 14, 15],
                  stroke: 'green',
                  strokeWidth: '2',
                },
              ],
            }}
            height={125}
            chartConfig={{
              graphBackgroundColor: 'transparent',
              label: {
                color: 'gren',
                colorDot: 'red',
              },
              color: 'gren',
              colorDot: 'red',
              stroke: 'green',
              strokeWidth: '2',
              // paddingRight2: 0,
              // graphBackgroundColor: 'red',
            }}
            // chartConfig={{
            //   graphBackgroundColor: 'green',
            //   // backgroundColor: 'red',
            //   // backgroundGradientFrom: 'red',
            //   // backgroundGradientTo: 'green',
            //   // decimalPlaces: 1, // optional, defaults to 2dp
            //   // color: () => 'red',
            //   // colorDot: 'green',
            // }}
            bezier
            withDots
            fillSides
            fillBottom
            activeDot={activeDot}
            style={{
              width: '100%',
            }}
            onLeftSwipeDot={() => {
              const prevDot = this.LineChart.getPreviousDot();
              if (prevDot) {
                this.setState({
                  activeDot: prevDot.label,
                  activeBalance: prevDot.data,
                });
              }
            }}
            onRightSwipeDot={() => {
              const nextDot = this.LineChart.getNextDot();
              if (nextDot) {
                this.setState({
                  activeDot: nextDot.label,
                  activeBalance: nextDot.data,
                });
              }
            }}
          /> */}
        </View>
        <View style={[sg.row, sg.spaceBetween]}>
          <Text style={[sg.fS14, sg.fontMedium]} color3>
            Mar
          </Text>
          <Text style={[sg.fS14, sg.fontMedium]} color3>
            Jun
          </Text>
        </View>
      </View>
    );
  }

  /*
  renderBalance() {

    const { accounts, navigation } = this.props;

    const accountIdActive = navigation.getParam('accountId', 'NO-ID');

    console.log("Accounts: " + JSON.stringify(accounts));
    console.log("Account ID Selected: " + JSON.stringify(accountIdActive));

    return accounts.map((account) => {

      if (account.id === accountIdActive) {

        const rawBalance = formatAmountDollarCent(account.balanceIncludingPendingInDollars);
        const balanceDollars = rawBalance.substring(0, rawBalance.length - 3);
        const balanceCents = rawBalance.substring(rawBalance.length - 2, rawBalance.length);

        return (
          <View
            style={[sg.aICenter, sg.mT50, sg.mB25]}
            key={account.id}
          >
            <Button
              transparent
              iconRight
              style={sg.aSCenter}
              onPress={() => {
                BottomInfo.showAccounts();
              }}
            >
              <Text style={styles.title}>{account.nickName}</Text>
              <Icon name="ios-arrow-down" style={styles.titleIcon} />
            </Button>

            <View style={sg.row}>
              <H1 style={styles.mainAmount}>{balanceDollars}</H1>
              <Text style={styles.mainAmountCent}>.{balanceCents}</Text>
            </View>
          </View>
        )
      }

    });


  }
  */

  render() {
    const { segment } = this.state;

    return (
      <Content>
        {/*
        <Balance
          onPress={() => {
            BottomInfo.showAccounts({
              superAccount: false,
            });
          }}
        />
        */}

        <View style={[sg.contentMarginH2, sg.mT30, sg.mB30]}>
          <Br style={[sg.footerBl]} />
          <View style={[sg.mH20, sg.row]}>
            <Button
              transparent
              onPress={this.setPerfomanceSegment}
              style={[
                styles.activityTabTitleBl,
                segment.isPerfomance ? styles.activityTabTitleBlActive : {},
                sg.mR70,
              ]}
            >
              <Text
                style={[
                  styles.activityTabTitleTextActive,
                  !segment.isPerfomance ? styles.activityTabTitleText : {},
                ]}
              >
                Perfomance
              </Text>
            </Button>
            <Button
              transparent
              onPress={this.setInvestmentSegment}
              style={[
                styles.activityTabTitleBl,
                segment.isInvestment ? styles.activityTabTitleBlActive : {},
              ]}
            >
              <Text
                style={[
                  styles.activityTabTitleTextActive,
                  !segment.isInvestment ? styles.activityTabTitleText : {},
                ]}
              >
                Investment
              </Text>
            </Button>
          </View>
        </View>

        {segment.isPerfomance ? (
          <View>
            <Text style={[sg.fontMedium, sg.contentMarginH]}>
              The Target Return of the Fund is 5.2%pa after fees and expenses and including
              distributions.
            </Text>
            {this.renderChart()}
          </View>
        ) : (
          <Investment {...this.props} />
        )}
        {/*
        <Perfomance {...this.props} />
        */}
      </Content>
    );
  }
}

const mapStateToProps = state => {
  const accounts = accountsSelector(state);

  return {
    accounts,
  };
};

export default connect()(TabActivity);
