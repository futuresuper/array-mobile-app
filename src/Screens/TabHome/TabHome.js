/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View, FlatList, TouchableOpacity,
} from 'react-native';

import {
  Text,
  Content,
  Button,
  Icon,
  H1,
  H2,
  Grid,
  Col,
  Row,
  View as ViewNB,
} from 'native-base';

import BottomInfo from 'src/Components/BottomInfo';
import LiveClock from 'src/Components/LiveClock';
import { routeNames } from 'src/Navigation';
import SunGlow from 'src/Components/SunGlow';
import { formatAmountDollar, formatAmountDollarCent } from 'src/Common/Helpers';

import { LineChart } from 'src/Components/ChartKit';
import {
  impactStatsSelector,
  updatesSelector,
  accountsSelector,
  userSelector,
  updateArticlieLike,
} from 'src/Redux/AppContent';
import {
  accountSelector,
} from 'src/Redux/Account';

import { sg } from 'src/Styles';

import ArticleCard from 'src/Components/ArticleCard';
import ArticleModal from './ArticleModal';
import styles from './styles';


const actionToPageConst = {
  desposit: 'Deposit',
};

class TabHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        visible: false,
        item: null,
      },
      activeDot: 'Mar 8',
      activeBalance: 0,
    };
  }

  likeArticle(form) {
    const { screenProps, toggleArticleLike } = this.props;
    screenProps.Api.post('/like', form, () => {
      toggleArticleLike(form);
    },null, false);
  }

  openArticle(item) {
    const { screenProps } = this.props;
    const { actionToPage } = item;

    if (actionToPage) {
      switch (actionToPage) {
        case actionToPageConst.desposit:
          screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW);
          break;
        default:
          break;
      }
    } else {
      // screenProps.navigateTo(routeNames.ARTICLE, { item });
      this.setState({
        article: {
          visible: true,
          item,
        },
      });
    }
  }

  renderImpactItem() {
    const { impactStats } = this.props;

    return (
      <Grid>
        {impactStats.map(({ number, label }, index) => (
          <Col style={sg.aICenter} key={index.toString()}>
            <Text style={[sg.headingS]}>{number}</Text>
            <Text
              style={[sg.textCenter, sg.fontBodySmall, sg.colorGray11, sg.mT10, styles.impactStats]}
            >
              {label}
            </Text>
          </Col>
        ))}
      </Grid>
    );
  }

  renderGlow = () => <SunGlow utcOffset={600} style={styles.circleDay} {...this.props} />;

  renderContentItem = ({ item }) => <ArticleCard {...item} onPressLike={(l) => this.likeArticle(l)} onPressOpen={(i) => this.openArticle(i)} key={item.id} />;

  renderChart() {
    const { screenProps } = this.props;
    const { activeDot } = this.state;
    const theme = screenProps.getTheme();

    return (
      <LineChart
        ref={(c) => {
          if (c) this.LineChart = c;
        }}
        data={{
          datasets: [
            {
              data: [10, 12, 14, 15],
            },
          ],
        }}
        height={125}
        chartConfig={{
          graphBackgroundColor: theme.containerBgColor,
          label: {
            color: theme.textColor,
          },
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
      />
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

  renderBalance() {
    const { user, selectedAccount } = this.props;

    if (selectedAccount) {
      const balance = {};
      if (selectedAccount.balanceIncludingPendingInDollars) {
        const rawBalance = formatAmountDollarCent(selectedAccount.balanceIncludingPendingInDollars);
        balance.dollars = rawBalance.substring(0, rawBalance.length - 3);
        balance.cents = rawBalance.substring(rawBalance.length - 2, rawBalance.length);
      } else {
        balance.dollars = '$0';
        balance.cents = '00';
      }

      let nickName;
      if (selectedAccount.nickName) {
        nickName = selectedAccount.nickName;
      } else if (user && user.firstName) {
        nickName = user.firstName;
      } else {
        nickName = 'Accounts';
      }

      return (
        <View style={[sg.aICenter, sg.mT25, sg.mB25]}>

          <Button
            transparent
            iconRight
            style={sg.aSCenter}
            onPress={() => {
              BottomInfo.showAccounts();
              // screenProps.navigateTo(routeNames.ACCOUNTS); // CHANGE TO MODAL BOTTOM WHEN FIXED
            }}
          >
            <Text style={styles.title}>{nickName}</Text>
            <Icon name="ios-arrow-down" style={styles.titleIcon} />
          </Button>

          <View style={sg.row}>
            <Icon name="ios-help-circle-outline" style={styles.amountIcon} onPress={() => BottomInfo.showBalance()} />
            <H1 style={styles.mainAmount}>{balance.dollars}</H1>
            <Text style={styles.mainAmountCent}>{`.${balance.cents}`}</Text>
          </View>
          {this.renderAwaitingDirectDebit(selectedAccount.amountAwaitingDirectDebit)}
        </View>
      );
    }
    return null;
  }

  render() {
    const { screenProps, updates } = this.props;
    const { article } = this.state;

    return (
      <Content bounces>
        <View style={[sg.oFHidden]}>
          <View style={[sg.contentPadding2, sg.zIndex10]}>
            <View style={sg.mB40}>
              <Grid>
                <Row>
                  <Col style={sg.aICenter}>
                    <Icon
                      type="FontAwesome5"
                      name="map-marker"
                      style={[sg.fS14, sg.colorPrimary]}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        screenProps.navigateTo(routeNames.SOLAR_FARM);
                      }}
                      style={styles.farmName}
                    >
                      <Text style={[sg.fS14, sg.fontMedium]}>Brigalow Solar Farm</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row style={sg.jCCenter}>
                  <LiveClock style={styles.localTime} utcOffset={600} />
                  <Text style={styles.localTime}> local time</Text>
                </Row>
              </Grid>
            </View>
            {this.renderBalance()}
            <Button
              rounded
              primary
              style={styles.plusButton}
              onPress={() => {
                screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW);
              }}
            >
              <Icon name="add" style={styles.plusButtonIcon} />
            </Button>
          </View>
          <View style={styles.graphBl}>
            {this.renderGlow()}
            {this.renderChart()}
          </View>
        </View>

        <ViewNB style={styles.contentBl}>
          <H2 style={[sg.headingS, sg.colorGray11, sg.aSCenter, sg.mB20]}>Updates</H2>

          {/* <View style={[sg.pT15, sg.pB30]}>{this.renderImpactItem()}</View> */}

          <FlatList
            extraData={screenProps.themeMode}
            data={updates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderContentItem}
          />
        </ViewNB>

        <ArticleModal
          themeMode={screenProps.themeMode}
          visible={article.visible}
          item={article.item}
          onRequestClose={() => {
            this.setState({
              article: {
                visible: false,
                item: null,
              },
            });
          }}
        />
      </Content>
    );
  }
}

TabHome.propTypes = {
  impactStats: PropTypes.array.isRequired,
  updates: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  selectedAccount: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  toggleArticleLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const impactStats = impactStatsSelector(state);
  const updates = updatesSelector(state);
  const accounts = accountsSelector(state);
  const selectedAccount = accountSelector(state);
  const user = userSelector(state);

  return {
    impactStats,
    accounts,
    selectedAccount,
    updates,
    user,
  };
};

const mapDispatchToProps = {
  toggleArticleLike: updateArticlieLike,
};


export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
