
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  View,
  Text,
  Icon,
  Grid,
  Row,
  Col,
} from 'native-base';

import { routeNames } from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

import SunDark from 'src/assets/images/SunDark.png';
import HeartDark from 'src/assets/images/HeartDark.png';
import Oval from './images/Oval.png';

import styles from './styles';

class Investment extends Component {
  renderInvTitle(image, title) {
    return (
      <Grid style={styles.activityInvTitle}>
        <Row style={[sg.aICenter]}>
          <Image source={image} />
          <Text style={[sg.headingS, sg.colorDark2, sg.mL15]}>{title}</Text>
        </Row>
      </Grid>
    );
  }

  renderInvBody(value) {
    return (
      <Grid style={sg.contentMarginH}>
        <Col style={sg.width110}>
          <Text style={[sg.headingS, sg.colorDark2]}>{value}</Text>
          <Text style={[sg.fS14, sg.colorGray11]}>Target</Text>
        </Col>
        <Col>
          <Text style={[sg.fS14]}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
          </Text>
        </Col>
      </Grid>
    );
  }

  render() {
    const { screenProps } = this.props;

    return (
      <View style={sg.mB20}>
        <View style={sg.mH0}>
          <Text style={[sg.fontMedium, sg.contentMarginH]}>Let&apos;s break down where your money is going.</Text>

          <Image source={Oval} style={[sg.aSCenter, sg.mT20, sg.mB30]} />

          {this.renderInvTitle(SunDark, 'Renewables')}
          {this.renderInvBody('60%')}

          <View style={sg.mT40} />

          {this.renderInvTitle(HeartDark, 'Ethical')}
          {this.renderInvBody('40%')}

        </View>

        <TouchableOpacity
          style={styles.allInvestHeader}
          onPress={() => {
            screenProps.navigateTo(routeNames.ALL_INVESTMENTS);
          }}
        >
          <Text style={[sg.fontMedium]}>See all inverstments</Text>
          <Icon name="ios-arrow-forward" style={[sg.colorDark3, sg.fS20]} />
        </TouchableOpacity>

      </View>
    );
  }
}

export default Investment;
