
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Text,
  Content,
  Button,
  Icon,
  H2,
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
import {
  routeNames,
} from 'src/Navigation';
import moment from 'src/Common/moment';
import SunGlow from 'src/Components/SunGlow';
import {
  LineChart,
} from 'src/Components/ChartKit';

import GraphExample from 'src/assets/images/GraphExample.png';

import {
  content as contentTest,
} from 'src/assets/testdata/testData';

import {
  sg,
} from 'src/Styles';

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
      content: contentTest,
      currentTime: moment().format(),
      article: {
        visible: false,
        item: null,
      },
      activeDot: 'Apr 1',
    };
  }

  componentDidMount() {
    const { navigation, screenProps } = this.props;
    const { currentTime } = this.state;

    navigation.setParams({
      // backgroundColor: styles.containerBg.backgroundColor,
    });

    // screenProps.enableTheme(currentTime);
  }

  renderImpactItem = ({ number, text, suffix }, key) => (
    <Col style={sg.aICenter} key={key}>
      <Text style={[sg.headingS]}>
        {number}
        {suffix || ''}
      </Text>
      <Text style={[sg.textCenter, sg.fontBodySmall, sg.colorGray11, sg.mT10]}>{text}</Text>
    </Col>
  );

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
        style={[(actionToPage ? sg.m5 : {})]}
      >
        {image && (
          <Left style={[sg.mR10, sg.flexNull]}>
            <Image source={{ uri: item.image }} resizeMode="cover" style={styles.contentItemSmallImage} />
          </Left>
        )}
        <Body style={[sg.mL0]}>
          <Row style={[sg.aICenter]}>
            <Col>
              <Text style={[sg.fS16, sg.fontMedium, (actionToPage ? sg.textCenter : {})]}>{item.headline}</Text>
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

  // eslint-disable-next-line class-methods-use-this
  renderContentItemLarge(item) {
    return (
      <CardItem
        button
        onPress={() => {
          this.openArticle(item);
        }}
      >
        <Left style={[sg.mR20, sg.flexNull]}>
          <Image source={{ uri: item.image }} resizeMode="cover" style={styles.contentItemLargeImage} />
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

    return (
      <Card>
        {cardItem}
      </Card>
    );
  }

  renderChart() {
    const { activeDot } = this.state;
    return (
      <LineChart
        ref={(c) => {
          if (c) this.LineChart = c;
        }}
        data={{
          labels: ['Jan 1', 'Feb 23', 'Mar 8', 'Apr 1', 'May 9', 'Jun 12', 'Sep 1', 'Nov 4', 'Dec 31'],
          datasets: [{
            data: [
              100,
              500,
              0,
              500,
              850,
              1200,
              670,
              754,
              501,
            ],
          }],
        }}
        height={120}
        chartConfig={{
          // paddingRight2: 0,
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
        activeDot={activeDot}
        style={{
          borderWidth: 2,
          borderColor: 'red',
        }}
        onLeftSwipeDot={() => {
          const prevDot = this.LineChart.getPreviousDot();
          if (prevDot) {
            this.setState({
              activeDot: prevDot.label,
            });
          }
        }}
        onRightSwipeDot={() => {
          const nextDot = this.LineChart.getNextDot();
          if (nextDot) {
            this.setState({
              activeDot: nextDot.label,
            });
          }
        }}
      />
    );
  }

  render() {
    const { screenProps } = this.props;
    const { content, article } = this.state;
    const theme = screenProps.getTheme();

    return (
      <Content bounces={false}>

        <View style={[sg.oFHidden]}>
          <View style={[sg.contentPadding2, sg.zIndex10]}>

            <View style={sg.mB40}>
              <Grid>
                <Row>
                  <Col style={sg.aICenter}>
                    <Icon type="FontAwesome5" name="map-marker" style={[sg.fS14, sg.colorPrimary]} />
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
                  <Text style={styles.localTime}>1:40am local time</Text>
                </Row>
              </Grid>
            </View>

            <Balance
              onPress={() => {
                BottomInfo.showAccounts();
              }}
            />

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
            {/* <Image source={GraphExample} style={[styles.graphExample, sg.tintColor(theme.graphExampleColor)]} /> */}

            {/* <View style={styles.graphBottomLine} />
            <View style={styles.graphPointBl}>
              <Text style={styles.graphPointText}>Feb 25</Text>
              <Icon type="FontAwesome" name="circle" style={[sg.fS15, sg.colorPrimary]} />
            </View> */}

            {this.renderChart()}
          </View>

        </View>

        <ViewNB style={styles.contentBl}>
          <H2 style={[sg.headingS, sg.colorGray11, sg.aSCenter]}>Impact</H2>

          <View style={[sg.pT15, sg.pB30]}>
            <Grid>
              {content.impact.map((item, index) => (
                this.renderImpactItem(item, index)
              ))}
            </Grid>

          </View>

          <FlatList
            extraData={screenProps.theme}
            data={content.latest}
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

export default connect()(TabHome);
