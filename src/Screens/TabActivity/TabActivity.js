import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Image,
  Linking
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

import composeHoc from 'src/Common/Hocs';
import CheckBox from 'src/Components/CheckBox';

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
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      buttonDisabled: false,
      requestMade: false
    };
  }

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

  clickOnLink() {
    Linking.openURL('https://www.futurerenewablesfund.com.au/pds');
  }

  onConfirm() {
    const { screenProps, selectedAccount } = this.props;
    const { id } = selectedAccount;
    screenProps.Api.post('/redemption', { id }, () => {
      // confirmRedemptionRequest();
      this.setState({ requestMade: true })
    }, null, false);
  }

  toggleChecked() {
    const { checked } = this.state;
    checked ? this.setState({checked: false, buttonDisabled: true}) : this.setState({checked: true, buttonDisabled: false});
  }

  renderNoOffer() {
    return (
      <View style={[sg.contentMarginH2]}>
        <Text style={[sg.textCenter, sg.fS14, sg.textBold]}>
          There is currently no Withdrawal Offer open.
        </Text>
      </View>
    )
  }

  renderRedemptionRequestMade() {
    return (
      <View style={[sg.contentMarginH2]}>
        <Text style={[sg.textCenter, sg.fS14, sg.textBold]}>
          We have received your withdrawal request for this account.
        </Text>
      </View>
    )
  }

  renderWithdrawlTab() {

    const { selectedAccount, user } = this.props;
    const { checked, buttonDisabled } = this.state;

    return (
      <View style={[sg.contentMarginH2]}>
        <Text style={[sg.textCenter, sg.fS16, sg.textBold]}>
          Redemption Request
        </Text>
        <Text style={[sg.fS12, sg.mT10]}>
          In response to the
          {' '}
          <Text onPress={() => this.clickOnLink()} style={[sg.fS12, sg.textUnderline]}>
            Future Renewables Fund Withdrawal Offer dated { selectedAccount.withdrawalOfferOpenDate }
          </Text>
          .
        </Text>
        <Text style={[sg.fS12, sg.mT10]}>
        You can use this form, to make a
          {' '}
          <Text style={[sg.fS12, sg.textBold]}>full withdrawal</Text>
        . Withdrawal proceeds will be paid  to
        {' '}
        <Text style={[sg.fS12, sg.textBold]}>your nominated account</Text>
        . If you wish to make a partial withdrawal, or have the withdrawal proceeds paid to a different account, please use the
        {' '}
        <Text onPress={() => this.clickOnLink()} style={[sg.fS12, sg.textUnderline]}>
          Redemption Request Form available on the Fund website instead
        </Text>
        .
        </Text>
        <Text style={[sg.fS12, sg.mT10]}>
        Account Number: <Text style={[sg.fS12, sg.textBold]}>{ selectedAccount.registryAccountNumber }</Text>
        </Text>
        <Text style={[sg.fS12, sg.mT5]}>
        Account Name: <Text style={[sg.fS12, sg.textBold]}>{user.firstName} {user.lastName}</Text>
        </Text>
        <Text style={[sg.fS12, sg.mT5]}>
        Offer open date: <Text style={[sg.fS12, sg.textBold]}>{ selectedAccount.withdrawalOfferOpenDate }</Text>
        </Text>
        <Text style={[sg.fS12, sg.mT5]}>
        Offer close date: <Text style={[sg.fS12, sg.textBold]}>{ selectedAccount.withdrawalOfferCloseDate }</Text>
        </Text>
        <Text style={[sg.fS12, sg.mT5]}>
        Withdrawal Amount: <Text style={[sg.fS12, sg.textBold]}>Full Withdrawal</Text>
        </Text>
        <Text style={[sg.fS12, sg.mT5]}>
        Payment to: <Text style={[sg.fS12, sg.textBold]}>Nominated Bank Account</Text>
        </Text>

        <Grid style={sg.mT20}>
          <Col style={sg.width50}>
            <CheckBox checked={checked} onPress={() => this.toggleChecked()} />
          </Col>
          <Col>
            <Text style={[sg.fS12, sg.mB20]}>
            I confirm that I am the security holder, and I request that I make a full withdrawal to be paid to my nominated bank account.
            </Text>
          </Col>
        </Grid>
        <View>
          <Button onPress={() => this.onConfirm()} block disabled={buttonDisabled}>
            <Text>Confirm Redemption Request</Text>
          </Button>
        </View>
      </View>
    )
  }

  render() {
    const { selectedAccount, user, unitPrices } = this.props;
    const { checked, buttonDisabled, requestMade } = this.state;
    const redemptionRequestMade = selectedAccount.redemptionRequested || requestMade;

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
          initialPage={2}
          style={{ marginTop: 10, height: (isIOS() ? undefined : 1000) }}
          tabBarUnderlineStyle={{ backgroundColor: sc.color.primary }}
          tabBarTextStyle={{
            fontSize: 12,
            fontFamily: sc.font.bold,
          }}
          renderTabBar={() => <ScrollableTabBar inactiveTextColor={sc.color.lightPurple2} />}
        >

          <View tabLabel="Transactions" style={{ paddingTop: 20 }}>
            { this.renderTransactionsTab()}
          </View>

          <View tabLabel="Withdrawals" style={{ paddingTop: 20 }}>
            { !redemptionRequestMade && selectedAccount.withdrawalOfferOpen && this.renderWithdrawlTab() }
            { !redemptionRequestMade && !selectedAccount.withdrawalOfferOpen && this.renderNoOffer() }
            { redemptionRequestMade && this.renderRedemptionRequestMade() }
          </View>

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

  return {
    accounts,
    selectedAccount,
    user,
  };
};

export default connect(mapStateToProps)(TabActivity);
