
import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  Icon,
  H1,
  H2,
  H3,
  Grid,
  Row,
  Col,
  Badge,
  List,
  ListItem,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import TextQuestion from 'src/Components/TextQuestion';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class Investment extends Component {
  render() {
    return (
      <View>
        <Text>Let&apos;s break down where your money is going.</Text>

        <Grid style={[sg.bGWhite, sg.mV20]}>
          <Col style={[sg.center, sg.p20]}>
            <Icon type="FontAwesome5" name="sun" />
          </Col>
          <Col style={[sg.center, sg.p20, sg.bGGray8]}>
            <Icon name="ios-heart" />
          </Col>
        </Grid>

        <Grid>
          <Col style={sg.width130}>
            <Text style={styles.investFarmTitle}>Solar Farms</Text>
            <Text style={[styles.investFarmProgress, sg.mV10]}>60%</Text>
            <TextQuestion text="Target" />
          </Col>
          <Col>
            <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
            </Text>
          </Col>
        </Grid>

        <List>
          <ListItem NoIndent />

        </List>

      </View>
    );
  }
}

export default Investment;
