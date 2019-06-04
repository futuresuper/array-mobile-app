
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
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
  Card,
  CardItem,
  Body,
  Left,
  Right,
} from 'native-base';

import BottomInfo from 'src/Components/BottomInfo';
import Br from 'src/Components/Br';
import {
  routeNames,
} from 'src/Navigation';

import GraphExample from 'src/assets/images/GraphExample.png';
import CircleSunrise from 'src/assets/images/CircleSunrise.png';
// import CircleDay from 'src/assets/images/CircleDay.png';
// import CircleSunset from 'src/assets/images/CircleSunset.png';
// import CircleNight from 'src/assets/images/CircleNight.png';

import {
  content as contentTest,
} from 'src/assets/testdata/testData';

import {
  sg,
} from 'src/Styles';
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
      // list: [
      //   {
      //     cardType: cardTypeConst.SMALL,
      //     headLine: 'This is a card with a user action',
      //     subHead: 'subHead 2',
      //     actionPage: 'hz',
      //   },
      //   {
      //     cardType: cardTypeConst.SMALL,
      //     headLine: 'Chinchilla Solar Farm currenntly 58MW',
      //     subHead: 'subHead 2',
      //   },
      //   {
      //     cardType: cardTypeConst.SMALL,
      //     headLine: 'Vance Joy Just joined',
      //     subHead: 'subHead 2',
      //     image: 'https://subscribers-prod.s3.amazonaws.com/uploads/setting/modal_image/27736/1.2cC_instller.jpg',
      //     timeAgo: '6 days ago',
      //   },
      //   {
      //     cardType: cardTypeConst.LARGE,
      //     headLine: 'Introducing FEAT. — bringing musicians and artists into Array',
      //     subHead: 'Our Partner',
      //     image: 'https://www.solarcostguide.com/guides/wp-content/uploads/2015/09/crazy-solar-panels.jpg',
      //   },
      //   {
      //     cardType: cardTypeConst.LARGE,
      //     headLine: 'Take a look at exactly where your money goes',
      //     subHead: 'Behind the scenes',
      //     image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1936&q=80',
      //   },
      // ]
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      backgroundColor: styles.containerBg.backgroundColor,
    });
  }

  renderImpactItem = ({ number, text }, key) => (
    <Col style={sg.aICenter} key={key}>
      <Text style={[sg.fS30, sg.textBold]}>{number}</Text>
      <Text style={[sg.textCenter, sg.fS15, sg.colorGray]}>{text}</Text>
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
      screenProps.navigateTo(routeNames.ARTICLE, { item });
    }
  }

  renderContentItemSmall(item) {
    const { timeAgo, actionToPage, image } = item;

    return (
      <CardItem
        button={!!actionToPage}
        onPress={() => {
          this.openArticle(item);
        }}
      >
        {image && (
          <Left style={[sg.mR10, sg.flexNull]}>
            <Image source={{ uri: item.image }} resizeMode="cover" style={styles.contentItemSmallImage} />
          </Left>
        )}
        <Body style={[sg.mL0]}>
          <Row style={[sg.aICenter]}>
            <Col>
              <Text style={sg.fS15}>{item.headline}</Text>
            </Col>
            {timeAgo && (
              <Col style={[sg.aIRight, sg.flex08]}>
                <Text style={[sg.fS14, sg.colorGray]}>{item.timeAgo}</Text>
              </Col>
            )}
          </Row>
        </Body>
        {actionToPage && (
          <Right style={[sg.width30, sg.flexNull]}>
            <Icon name="md-arrow-forward" />
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
              <Text style={[sg.fS14, sg.colorGray3]}>{item.subhead}</Text>
            </Row>
            <Row>
              <Text style={[sg.fS16]}>{item.headline}</Text>
            </Row>
            <Row style={[sg.aIEnd]}>
              <Text style={[sg.fS14, sg.colorGray3]}>Read more</Text>
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

  render() {
    const { screenProps } = this.props;
    const { content } = this.state;

    return (
      <Content contentContainerStyle={[styles.containerBg]} bounces={false}>

        <View style={[sg.oFHidden]}>
          {/* <LinearGradient colors={[styles.containerBg.backgroundColor, sc.color.white]} style={sg.absoluteFillObject} locations={[0, 1]} /> */}
          {/* <Image
            resizeMode="contain"
            source={Glow}
            style={styles.grow}
          /> */}

          <View style={sg.contentPadding}>

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

            <View style={[sg.aICenter, sg.mT50, sg.mB25]}>
              <Button
                transparent
                iconRight
                style={sg.aSCenter}
                onPress={() => {
                  BottomInfo.showAccounts();
                }}
              >
                <Text style={styles.title}>Grace</Text>
                <Icon name="ios-arrow-down" style={styles.titleIcon} />
              </Button>

              <View style={sg.row}>
                <H1 style={styles.mainAmount}>$1,978</H1>
                <Text style={styles.mainAmountCent}>.00</Text>
              </View>
            </View>

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
            <Image source={CircleSunrise} style={styles.circleDay} />
            <Image source={GraphExample} style={styles.graphExample} />

            <View style={styles.graphBottomLine} />
            <View style={styles.graphPointBl}>
              <Text style={styles.graphPointText}>Feb 25</Text>
              <Icon type="FontAwesome" name="circle" style={[sg.fS15, sg.colorPrimary]} />
            </View>

          </View>

        </View>

        <View style={styles.contentBl}>
          <H2 style={[sg.headingS, sg.colorGray11, sg.aSCenter]}>Impact</H2>

          <View style={[sg.pT20, sg.pB20]}>
            <Grid style={sg.mV10}>
              {content.impact.map((item, index) => (
                this.renderImpactItem(item, index)
              ))}
            </Grid>

            <Grid>
              <Col style={sg.jCCenter}>
                <Br />
              </Col>
              <Col style={sg.width60}>
                <Row style={[sg.aSCenter]}>
                  <Icon type="FontAwesome" name="circle-o" style={[sg.fS10, sg.colorGray10, sg.mR5]} />
                  <Icon type="FontAwesome" name="circle" style={[sg.fS10, sg.colorGray10]} />
                </Row>
              </Col>
              <Col style={sg.jCCenter}>
                <Br />
              </Col>
            </Grid>

          </View>

          <FlatList
            data={content.latest}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderContentItem}
          />

        </View>

      </Content>
    );
  }
}

export default connect()(TabHome);
