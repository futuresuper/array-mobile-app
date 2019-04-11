
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
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
} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

import Br from 'src/Components/Br';
import Glow from 'src/assets/images/Glow.png';

import {
  sg,
  sc,
} from 'src/Styles';
import styles from './styles';

class TabHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      backgroundColor: styles.containerBg.backgroundColor,
    });
  }

  renderImpactItem = (number, text) => (
    <Col style={sg.aICenter}>
      <Text style={[sg.fS30, sg.textBold]}>{number}</Text>
      <Text style={[sg.textCenter, sg.fS15, sg.colorGray]}>{text}</Text>
    </Col>
  );

  render() {
    return (
      <Content contentContainerStyle={[styles.containerBg]} bounces={false}>

        <View style={[sg.oFHidden]}>
          <LinearGradient colors={[styles.containerBg.backgroundColor, sc.color.white]} style={sg.absoluteFillObject} locations={[0, 1]} />
          <Image
            resizeMode="contain"
            source={Glow}
            style={styles.grow}
          />

          <View style={sg.mH10}>

            <View style={sg.mB40}>
              <Grid>
                <Row>
                  <Icon type="FontAwesome5" name="map-marker" style={[sg.fS14, sg.mR10]} />
                  <Text style={sg.fS14}>Brigalow Solar Farm</Text>
                </Row>
                <Row style={[sg.pL20, sg.pT5]}>
                  <Text style={[sg.fS14, sg.colorGray3]}>1:40am local time</Text>
                  <Icon name="ios-arrow-round-forward" style={[sg.fS20, sg.colorGray3, sg.mL10]} />
                </Row>
              </Grid>
            </View>

            <View>
              <Button
                transparent
                iconRight
                style={sg.mB10}
                onPress={() => {
                  this.props.screenProps.alert('ok');
                }}
              >
                <Text style={styles.title}>Grace</Text>
                <Icon name="ios-arrow-down" style={styles.titleIcon} />
              </Button>

              <H1 style={styles.mainAmount}>$1,978</H1>

              <Button
                rounded
                dark
                style={sg.mT20}
              >
                <Icon name="add" />
              </Button>
            </View>
          </View>

          <View style={styles.graphBl}>
            <View style={styles.graphBottomLine} />
            <View style={styles.graphPointBl}>
              <Text style={styles.graphPointText}>Today</Text>
              <Icon type="FontAwesome" name="circle" style={[sg.fS15]} />
            </View>
          </View>

        </View>

        <View style={styles.contentBl}>
          <View style={styles.impact}>
            <H2>Impact</H2>
            <Text style={[sg.fS14, sg.colorGray7]}>Powered by 12k members</Text>
          </View>

          <View style={sg.pT20}>
            <Br />

            <Grid style={sg.mV10}>
              {this.renderImpactItem(9, 'Solar farms owned')}
              {this.renderImpactItem('12k', 'Homes powered')}
              {this.renderImpactItem('50t', 'Of carbon removed')}
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


        </View>

      </Content>
    );
  }
}

export default connect()(TabHome);
