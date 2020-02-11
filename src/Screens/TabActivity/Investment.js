import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View, Text, Icon, Grid, Row, Col, List, ListItem,
} from 'native-base';

import Image from 'src/Components/Image';

import { routeNames } from 'src/Navigation';

import { sg } from 'src/Styles';

import SunDark from 'src/assets/images/SunDark.png';
import HeartDark from 'src/assets/images/HeartDark.png';
import Oval from './images/Graph.png';

import styles from './styles';

class Investment extends Component {
  renderInvTitle(image, title) {
    return (
      <Grid style={[sg.pV10]}>
        <Row style={[sg.aICenter, sg.pL30]}>
          <Image source={image} color2 />
          <Text style={[sg.headingS, sg.mL15]} color2>
            {title}
          </Text>
        </Row>
      </Grid>
    );
  }

  renderInvBody(value, description) {
    return (
      <Grid>
        <Col style={sg.width110}>
          <Text style={[sg.headingS]} color2>
            {value}
          </Text>
          <Text style={[sg.fS14, sg.colorGray11]}>Target</Text>
        </Col>
        <Col>
          <Text style={[sg.fS14]}>{description}</Text>
        </Col>
      </Grid>
    );
  }

  render() {
    const { screenProps } = this.props;
    const theme = screenProps.getTheme();

    return (
      <View style={sg.mB20}>
        <View style={sg.mH0}>
          <Text style={[sg.fontMedium, sg.contentMarginH]}>
            Let&apos;s break down where your money is going.
          </Text>

          <Image source={Oval} style={[sg.aSCenter, sg.mT20, sg.mB30, styles.investGraph]} />

          <List>
            <ListItem>
              { this.renderInvTitle(SunDark, 'Renewables') }
            </ListItem>
            <ListItem>
              {this.renderInvBody(
                '60%',
                'The portfolio contains investments in renewables such as solar and wind farms',
              )}
            </ListItem>
            <ListItem>
              {this.renderInvTitle(HeartDark, 'Ethical')}
            </ListItem>
            <ListItem>
              {this.renderInvBody(
                '40%',
                'Fixed Interest and Cash investments such as ‘corporate bonds’ issued by companies that pass our strict ethical screens',
              )}
            </ListItem>
          </List>
        </View>
        {/*
        <TouchableOpacity
          style={[styles.allInvestHeader, sg.borderColor(theme.borderColorList)]}
          onPress={() => {
            screenProps.navigateTo(routeNames.ALL_INVESTMENTS);
          }}
        >
          <Text style={[sg.fontMedium]}>See all investments</Text>
          <Icon name="ios-arrow-forward" style={[sg.fS20]} />
        </TouchableOpacity>
        */}
      </View>
    );
  }
}

export default Investment;
