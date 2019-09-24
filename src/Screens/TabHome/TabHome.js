import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View, Image, FlatList, TouchableOpacity,
} from 'react-native';

import {
  Text,
  Content,
  Button,
  Icon,
  H1,
  H2,
  H3,
  Grid,
  Col,
  Row,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  View as ViewNB,
} from 'native-base';

import BottomInfo from 'src/Components/BottomInfo';
import Balance from 'src/Components/Balance';
import { routeNames } from 'src/Navigation';
import moment from 'src/Common/moment';
import SunGlow from 'src/Components/SunGlow';
import { formatAmountDollar, formatAmountDollarCent } from 'src/Common/Helpers';

import { LineChart } from 'src/Components/ChartKit';
import { impactStatsSelector, latestSelector, accountsSelector, userSelector } from 'src/Redux/AppContent';

import { sg } from 'src/Styles';

import ArticleModal from './ArticleModal';
import styles from './styles';

const cardTypeConst = {
  SMALL: 'small',
  LARGE: 'large',
};

const actionToPageConst = {
  desposit: 'Deposit',
};

class TabHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: moment().format(),
      article: {
        visible: false,
        item: null,
      },
      activeDot: 'Mar 8',
      activeBalance: 0,
    };
  }

  componentDidMount() {
    // const { navigation, screenProps } = this.props;
    // const { currentTime } = this.state;
    // screenProps.enableTheme(currentTime);
    // screenProps.setDarkTheme();
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

  renderGlow() {
    const { currentTime } = this.state;
    return <SunGlow currentTime={currentTime} style={styles.circleDay} {...this.props} />;
  }

  renderContentItemSmall(item) {
    const { timeAgo, actionToPage, image } = item;

    return (
      <CardItem
        button={!!actionToPage}
        onPress={() => {
          this.openArticle(item);
        }}
        style={[actionToPage ? sg.m5 : {}]}
      >
        {image && (
          <Left style={[sg.mR10, sg.flexNull]}>
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={styles.contentItemSmallImage}
            />
          </Left>
        )}
        <Body style={[sg.mL0]}>
          <Row style={[sg.aICenter]}>
            <Col>
              <Text style={[sg.fS16, sg.fontMedium, actionToPage ? sg.textCenter : {}]}>
                {item.headline}
              </Text>
            </Col>
            {timeAgo && (
              <Col style={[sg.aIRight, sg.flex08]}>
                <Text style={[sg.fontMedium, sg.fS14, sg.colorGray12]}>{item.timeAgo}</Text>
              </Col>
            )}
          </Row>
        </Body>
        {actionToPage && (
          <Right style={[sg.width30, sg.flexNull]}>
            <Icon name="md-arrow-forward" style={[sg.colorPrimary, sg.fS24]} />
          </Right>
        )}
      </CardItem>
    );
  }

  renderContentItemLarge(item) {
    return (
      <CardItem
        button
        onPress={() => {
          this.openArticle(item);
        }}
      >
        <Left style={[sg.mR20, sg.flexNull]}>
          <Image
            source={{ uri: item.image }}
            resizeMode="cover"
            style={styles.contentItemLargeImage}
          />
        </Left>
        <Body>
          <Grid>
            <Row>
              <Text style={[sg.fontMedium, sg.fS14, sg.colorGray12]}>{item.subhead}</Text>
            </Row>
            <Row>
              <Text style={[sg.fS16, sg.fontMedium]}>{item.headline}</Text>
            </Row>
            <Row style={[sg.aIEnd]}>
              <Text style={[sg.fontMedium, sg.fS14, sg.colorGray12]}>Read more</Text>
            </Row>
          </Grid>
        </Body>
      </CardItem>
    );
  }

  renderContentItem = ({ item }) => {
    const { cardType } = item;
    let cardItem = null;

    if (cardType === cardTypeConst.SMALL) {
      cardItem = this.renderContentItemSmall(item);
    } else {
      cardItem = this.renderContentItemLarge(item);
    }

    return <Card>{cardItem}</Card>;
  };

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
          // labels: ['Mar 31', 'Apr 30', 'May 31', 'Jun 30'],
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
      return <Text style={styles.awaitingDebit}>{formatAmountDollar(data)} awaiting direct debit</Text>;
    }
    return null;
  }

  renderBalance() {
    const { accounts, user, navigation, screenProps } = this.props;
    const { account } = screenProps;

    if (account) {
      let balanceDollars, balanceCents;
      if (account.balanceIncludingPendingInDollars) {
        const rawBalance = formatAmountDollarCent(account.balanceIncludingPendingInDollars);
        balanceDollars = rawBalance.substring(0, rawBalance.length - 3);
        balanceCents = rawBalance.substring(rawBalance.length - 2, rawBalance.length);
      } else {
        balanceDollars = "$0";
        balanceCents = "00";
      }

      let nickName;
      if (account.nickName) {
        nickName = account.nickName;
      } else if (user && user.firstName) {
        nickName = user.firstName;
      } else {
        nickName = "Accounts";
      }

      return (
        <View style={[sg.aICenter, sg.mT50, sg.mB25]} key={account.id}>

          <Button
            transparent
            iconRight
            style={sg.aSCenter}
            onPress={() => {
              BottomInfo.showAccounts();
            }}
          >
            <Text style={styles.title}>{nickName}</Text>
            <Icon name="ios-arrow-down" style={styles.titleIcon} />
          </Button>

          <View style={sg.row}>
            <Icon name="ios-help-circle-outline" style={styles.amountIcon} onPress={() => BottomInfo.showBalance()} />
            <H1 style={styles.mainAmount}>{balanceDollars}</H1>
            <Text style={styles.mainAmountCent}>{`.${balanceCents}`}</Text>
          </View>
          {this.renderAwaitingDirectDebit(account.amountAwaitingDirectDebit)}
        </View>
      );
    }
    return null;
  }

  render() {
    const { screenProps, latest } = this.props;
    const { article, activeBalance } = this.state;
    const solarFarmTime = moment().format('hh:mma');

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
                  <Text style={styles.localTime}>{`${solarFarmTime} local time`}</Text>
                </Row>
              </Grid>
            </View>

            {
              this.renderBalance()
            }


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
          <H2 style={[sg.headingS, sg.colorGray11, sg.aSCenter]}>Impact</H2>

          <View style={[sg.pT15, sg.pB30]}>{this.renderImpactItem()}</View>

          <FlatList
            extraData={screenProps.theme}
            data={latest}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderContentItem}
          />
        </ViewNB>

        <ArticleModal
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
  latest: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const impactStats = impactStatsSelector(state);
  const latest = latestSelector(state);
  const accounts = accountsSelector(state);
  const user = userSelector(state);

  return {
    impactStats,
    latest,
    accounts,
    user
  };
};

export default connect(mapStateToProps)(TabHome);
