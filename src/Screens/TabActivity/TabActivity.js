import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View, Image, Dimensions } from 'react-native';
import { formatAmountDollarCent, formatAmountDollar } from 'src/Common/Helpers';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';

import _ from 'lodash';

import { routeNames } from 'src/Navigation';

import {
  Button, Text, Content, Icon, H1, Grid, Row, Col
} from 'native-base';

import { accountsSelector, userSelector } from 'src/Redux/AppContent';

import {
  accountSelector,
} from 'src/Redux/Account';


import Br from 'src/Components/Br';
import BottomInfo from 'src/Components/BottomInfo';
import Balance from 'src/Components/Balance';
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
      segment: {
        isPerfomance: true,
        isInvestment: false,
      },
      activeDot: 'Mar 8',
      activeBalance: 0,
      activity: [
        {
          type: 'Deposit',
          date: '29 Fed',
          status: 1,
          amount: '+$20.00',
        },
        {
          type: 'Deposit',
          date: '19 Fed',
          status: 2,
          amount: '+$20.00',
        },
        {
          type: 'Deposit',
          date: '09 Fed',
          status: 3,
          amount: '+$0.50',
        },
      ],
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
    return <SunGlow utcOffset={600} style={styles.activityCircleDay} {...this.props} />;
  }

  renderChart() {
    const { screenProps } = this.props;
    const { activeDot } = this.state;
    return (
      <View>
        <View style={[styles.activityChartBl, sg.aICenter]}>
          <Image source={GraphExample2} style={styles.activityGraph} />
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
        <View style={[sg.row, sg.spaceBetween, sg.contentMarginH2]}>
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


  renderAwaitingDirectDebit = (data) => {
    if (data) {
      return (
        <Text style={styles.awaitingDebit}>
          {`${formatAmountDollar(data)} awaiting direct debit`}
        </Text>
      );
    }
    return null;
  }

  renderActivityItem(item = {}, index = -1) {
    const { screenProps } = this.props;
    const theme = screenProps.getTheme();
    const isHeader = _.isEmpty(item);
    let status;

    if (item.status === "awaitingMoney" && item.paymentMethod === "dd") {
      status = 'Requested';
    } else if (item.status === "pending") {
      status = 'Pending';
    } else if (item.status === "processed") {
      status = 'Processed';
    } else if (item.status === undefined) {
      status = 'Status';
    }

    const amount = item.amountInDollars ? formatAmountDollarCent(item.amountInDollars) : "Amount";
    const date = item.date ? item.date : "Date";

    let type;
    if (item.type && item.type === "deposit") {
      type = "Deposit";
    } else if (item.type && item.type === "withdrawal") {
      type = "Withdrawal";
    } else {
      type = "Type";
    }

    const styleText = isHeader ? sg.colorGray11 : {};

    return (
      <Row
        key={index.toString()}
        style={[
          styles.activityRow,
          isHeader ? styles.activityRowHeader : {},
          sg.borderColor(theme.borderColorList),
        ]}
      >
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{type}</Text>
        </Col>
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{date}</Text>
        </Col>
        <Col style={[styles.activityCol]}>
          {status === "Processed" ? (
            <BadgeCheckmark inverted />
          ) : (
            <Text style={[styles.activityColText, sg.colorGray11, styleText]}>{status}</Text>
          )}
        </Col>
        <Col style={[styles.activityCol, sg.right]}>
          <Text style={[styles.activityColText, styleText]}>{amount}</Text>
        </Col>
      </Row>
    );
  }

  render() {
    const { segment } = this.state;
    const { selectedAccount, user, screenProps } = this.props;
    const activity = selectedAccount.transactions;

    return (
      <Content>

        <Balance
          account={selectedAccount}
          user={user}
          onPress={() => {
            BottomInfo.showAccounts({
              superAccount: false,
            });
          }}
        />

        <View style={[sg.mT30, sg.mB30]}>
          <Br style={[sg.footerBl]} />
          <View style={[sg.mH20, sg.row, sg.flex]}>
            <Button
              transparent
              onPress={this.setPerfomanceSegment}
              style={[
                styles.activityTabTitleBl,
                sg.flex05,
                segment.isPerfomance ? styles.activityTabTitleBlActive : {},
              ]}
            >
              <Text
                style={[
                  styles.activityTabTitleTextActive,
                  !segment.isPerfomance ? styles.activityTabTitleText : {},
                ]}
              >
                Performance
              </Text>
            </Button>
            <Button
              transparent
              onPress={this.setInvestmentSegment}
              style={[
                styles.activityTabTitleBl,
                sg.flex05,
                segment.isInvestment ? styles.activityTabTitleBlActive : {},
              ]}
            >
              <Text
                style={[
                  styles.activityTabTitleTextActive,
                  sg.textCenter,
                  !segment.isInvestment ? styles.activityTabTitleText : {},
                ]}
              >
                Investments
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

            <View style={[sg.contentMarginH2, sg.mT50]}>
              <H1 style={[sg.fS24, sg.textCenter, sg.mB30]}>Activity</H1>
              <Grid>
                {this.renderActivityItem()}
                {activity ? activity.map((item, index) => this.renderActivityItem(item, index)) : (
                  <View>
                    <Text style={[sg.mT20, sg.mB20]}>
                      Transactions will appear here once you start an account.
                    </Text>
                    <Button
                      onPress={() => {
                        screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
                      }}
                      block
                      style={[sg.mB40]}
                    >
                      <Text>Start an account</Text>
                    </Button>
                  </View>

                )}
              </Grid>
            </View>

          </View>
        ) : (
          <Investment {...this.props} />
        )}
      </Content>
    );
  }
}

TabActivity.propTypes = {
  accounts: PropTypes.array.isRequired,
  selectedAccount: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,

};


const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);
  const selectedAccount = accountSelector(state);
  const user = userSelector(state);
  return {
    accounts,
    selectedAccount,
    user,
  };
};

export default connect(mapStateToProps)(TabActivity);
