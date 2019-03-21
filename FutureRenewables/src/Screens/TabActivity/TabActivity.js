
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Button,
  Text,
  Content,
  Icon,
  Grid,
  Row,
  Col,
  H1,
  Badge,
} from 'native-base';

import Br from 'src/Components/Br';
import {
  routeNames,
} from 'src/Navigation';

import {
  styleGlobal,
} from 'src/Styles';

import styles from './styles';

class TabActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: [
        {
          type: 'Deposit',
          date: '29 Fed',
          status: 1,
          amount: '+$20.00',
        },
        {
          type: 'Deposit',
          date: '19 Fed',
          status: 2,
          amount: '+$20.00',
        },
        {
          type: 'Deposit',
          date: '09 Fed',
          status: 3,
          amount: '+$0.50',
        },
      ],
    };
  }

  render() {
    const { screenProps } = this.props;
    const { activity } = this.state;

    return (
      <Content padder>
        <View>
          <Button
            transparent
            iconRight
            style={{ marginLeft: 0 }}
          >
            <Text style={styleGlobal.pL0}>Account name</Text>
            <Icon name="ios-arrow-down" style={{ fontSize: 18 }} />
          </Button>

          <H1>$12,208,40</H1>
        </View>

        <Br style={styleGlobal.mV20} />

        <View style={styleGlobal.mT2012}>
          <Text style={styleGlobal.colorGray3}>
            Since you&apos;ve joined, you&apos;ve made
            <Text style={styleGlobal.textBold}> $600 </Text>
            and your account is up
            <Text style={styleGlobal.textBold}> 4.6% </Text>
            .
            {'\n'}
            Sweeet.
          </Text>
        </View>

        <View>
          <Button
            iconRight
            block
            gray4
            style={styleGlobal.mV30}
            onPress={() => {
              screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW);
            }}
          >
            <Text>Deposit</Text>
            <Icon name="add" />
          </Button>
        </View>

        <View>
          <H1>Activity</H1>
        </View>

        <View style={styleGlobal.mV20}>
          <Grid>
            {activity.map((item, index) => {
              const rowStyle = (index === 0) ? styles.activityRowFirst : {};
              const styleCols = {
                type: {},
                date: {},
                status: {},
                amount: {},
              };
              let status;

              if (item.status === 1) {
                status = 'Upcoming';
                styleCols.type = styles.activityColTextGray;
                styleCols.date = styles.activityColTextGray;
                styleCols.status = styles.activityColTextGray;
                styleCols.amount = styles.activityColTextGray;
              } else if (item.status === 2) {
                status = 'Pending';
                styleCols.status = styles.activityColTextGray;
                styleCols.amount = styles.activityColTextGray;
              }

              return (
                <Row key={index.toString()} style={[styles.activityRow, rowStyle]}>
                  <Col style={[styles.activityCol]}>
                    <Text style={[styles.activityColText, styleCols.type]}>{item.type}</Text>
                  </Col>
                  <Col style={[styles.activityCol]}>
                    <Text style={[styles.activityColText, styleCols.date]}>{item.date}</Text>
                  </Col>
                  <Col style={[styles.activityCol]}>
                    {(status)
                      ? <Text style={[styles.activityColText, styleCols.status]}>{status}</Text>
                      : <Badge style={styles.activityBadge}><Icon name="md-checkmark" style={styles.activityBadgeIcon} /></Badge>
                    }
                  </Col>
                  <Col style={[styles.activityCol, styleGlobal.right]}>
                    <Text style={[styles.activityColText, styleCols.amount]}>{item.amount}</Text>
                  </Col>
                </Row>
              );
            })}
          </Grid>
        </View>

      </Content>
    );
  }
}

export default connect()(TabActivity);
