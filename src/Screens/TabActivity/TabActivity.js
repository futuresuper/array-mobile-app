import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Image,
} from 'react-native';
import { formatAmountDollarCent, formatAmountDollar, isIOS } from 'src/Common/Helpers';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';

import _ from 'lodash';

import { routeNames } from 'src/Navigation';

import {
  Button,
  Text,
  Content,
  Icon,
  Grid,
  Row,
  Col,
} from 'native-base';

import {
  accountsSelector,
  userSelector,
  accountInvestmentsChartSelector,
} from 'src/Redux/AppContent';

import {
  accountSelector,
} from 'src/Redux/Account';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import BottomInfo from 'src/Components/BottomInfo';
import Balance from 'src/Components/Balance';
import SunGlow from 'src/Components/SunGlow';

import GraphExample2 from 'src/assets/images/GraphUpdatedOct.png';

import { sg, sc } from 'src/Styles';
import styles from './styles';

import Investment from './Investment';

class TabActivity extends Component {
  renderGlow() {
    return <SunGlow utcOffset={600} style={styles.activityCircleDay} {...this.props} />;
  }

  renderChart() {
    return (
      <View>
        <View style={[styles.activityChartBl, sg.aICenter]}>
          <Image source={GraphExample2} style={styles.activityGraph} />
          <Text style={[sg.fS11, sg.textBold, sg.textCenter, {
            paddingTop: 30, paddingHorizontal: 15, zIndex: 999,
          }]}
          >
            Past performance is not an indicator of future performance.
          </Text>
          {this.renderGlow()}
        </View>
        <View style={[sg.row, sg.spaceBetween, sg.contentMarginH2]}>
          <Text style={[sg.fS14, sg.fontMedium]} color3>
            Mar
          </Text>
          <Text style={[sg.fS14, sg.fontMedium]} color3>
            Oct
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

  renderTransactionsTab() {
    const { selectedAccount, screenProps } = this.props;
    const activity = selectedAccount.transactions;

    return (
      <View style={[sg.contentMarginH2, sg.mT10]}>
        {activity ? this.renderActivityItems(activity) : (
          <View>
            <Text style={[sg.textCenter, sg.pT10]}>
                Your transactions will show up here once you&apos;ve made your first deposit.
            </Text>
            <Button
              onPress={() => screenProps.navigateTo(routeNames.ABOUT_APP_FORM)}
              block
              style={[sg.mB40, sg.mT40]}
            >
              <Text>Start an account</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }


  renderPerformaceTabTable(item = {}) {
    const { screenProps } = this.props;
    const theme = screenProps.getTheme();
    const isHeader = _.isEmpty(item);
    let styleText = {};
    let textOne = 'Period';
    let textTwo = 'Return';

    if (isHeader) {
      styleText = sg.colorGray11;
    } else {
      ({ period: textOne, return: textTwo } = item);
    }

    return (
      <Row
        style={[
          styles.activityRow,
          isHeader ? styles.activityRowHeader : {},
          sg.borderColor(theme.borderColorList),
        ]}
      >
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{textOne}</Text>
        </Col>
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{textTwo}</Text>
        </Col>
      </Row>
    );
  }

  renderPerformaceTab() {
    return (
      <View style={[]}>
        <Text style={[sg.fontMedium, sg.contentMarginH]}>
          The Target Return of the Fund is 5.2% per annum after fees and expenses and including
          distributions.
          {' '}
          <Icon name="ios-help-circle-outline" style={{ fontSize: 20 }} onPress={() => BottomInfo.showAboutReturn()} />
        </Text>
        {/* {this.renderChart()} */}

        {/*
        <View style={[sg.contentMarginH, sg.mT10]}>

          <View style={sg.row}>
            <Text style={[sg.headingXS, sg.mT20]}>Returns to 31 Dec 2019</Text>
          </View>

          <View style={[sg.row, sg.mT30]}>
            <Grid>
              {this.renderPerformaceTabTable()}
              {this.renderPerformaceTabTable({ period: '1 month', return: '0.107%' })}
              {this.renderPerformaceTabTable({ period: '3 months', return: '0.438%' })}
              {this.renderPerformaceTabTable({ period: '6 months', return: '1.486%' })}
              {this.renderPerformaceTabTable({ period: 'Since inception', return: '3.327%' })}
            </Grid>
          </View>

          <View style={sg.row}>
            <Text style={[sg.fS12, sg.mT20]}>Fund inception date is 01/03/2019. Past performance is not a reliable indicator of future performance.</Text>
          </View>
        </View>
        */}
      </View>
    );
  }

  renderWithdrawlTab = () => (
    <View>
      <Text style={[sg.textCenter, sg.fS12, sg.textBold]}>
        There is no current open ‘Withdrawal Offer’.
      </Text>
    </View>
  )

  renderActivityItems(activity) {
    return (
      <Grid>
        {this.renderActivityItem()}
        {activity.map((item, index) => this.renderActivityItem(item, index))}
      </Grid>
    );
  }

  renderActivityItem(item = {}, index = -1) {
    const { screenProps } = this.props;
    const theme = screenProps.getTheme();
    const isHeader = _.isEmpty(item);
    let status;

    if (item.status === 'requested') {
      status = 'Requested';
    } else if (item.status === 'processed') {
      status = 'Processed';
    } else if (item.status === 'cancelled') {
      status = 'Cancelled';
    } else if (item.status === 'failed') {
      status = 'Failed';
    } else if (item.status === undefined) {
      status = 'Status';
    }

    const amount = item.amountInDollars ? formatAmountDollarCent(item.amountInDollars) : 'Amount';
    const date = item.date ? item.date : 'Date';
    const type = item.type ? item.type : 'Type';


    const styleText = isHeader ? sg.colorGray11 : {};

    console.log(type + date + status + amount);

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
          {status === 'Processed' ? (
            <BadgeCheckmark inverted />
          ) : (
            <Text style={[styles.activityColText, styleText]} onPress={() => BottomInfo.showStatusInfo()}>
              {`${status} `}
              {isHeader && (
              <Icon name="ios-help-circle-outline" style={{ fontSize: 15 }} />
              )}
            </Text>
          )}
        </Col>
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{amount}</Text>
        </Col>
      </Row>
    );
  }

  render() {
    const { selectedAccount, user, unitPrices } = this.props;

    return (
      <Content>

        <Balance
          selectedAccount={selectedAccount}
          user={user}
          unitPrices={unitPrices}
          onPress={() => {
            BottomInfo.showAccounts({
              superAccount: false,
            });
          }}
        />

        <ScrollableTabView
          style={{ marginTop: 20, height: (isIOS() ? undefined : 1000) }}
          tabBarUnderlineStyle={{ backgroundColor: sc.color.primary }}
          tabBarTextStyle={{
            fontSize: 12,
            fontFamily: sc.font.bold,
          }}
          renderTabBar={() => <ScrollableTabBar inactiveTextColor={sc.color.lightPurple2} />}
        >
          <View tabLabel="Returns" style={{ paddingTop: 20 }}>
            {this.renderPerformaceTab()}
          </View>
          <View tabLabel="Transactions" style={{ paddingTop: 20 }}>
            {this.renderTransactionsTab()}
          </View>
          <View tabLabel="Investments" style={{ paddingTop: 20 }}>
            <Investment {...this.props} />
          </View>
          {/*
          <View tabLabel="Withdrawals" style={{ paddingTop: 20 }}>
            {this.renderWithdrawlTab()}
          </View>
          */}
        </ScrollableTabView>
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
  const investmentsChart = accountInvestmentsChartSelector(state);

  return {
    accounts,
    selectedAccount,
    user,
    investmentsChart,
  };
};

export default connect(mapStateToProps)(TabActivity);
