
import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  Icon,
  H1,
  Grid,
  Row,
  Col,
} from 'native-base';

import _ from 'lodash';

import {
  routeNames,
} from 'src/Navigation';

import TextQuestion from 'src/Components/TextQuestion';
import {
  BottomInfo,
  StatusInfo,
} from 'src/Components/BottomInfo';
import BadgeCheckmark from 'src/Components/BadgeCheckmark';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class Perfomance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plusMinusValue: 0,
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

  btnPlus = () => {
    this.setState(prevState => ({
      plusMinusValue: prevState.plusMinusValue + 5,
    }));
  }

  btnMinus = () => {
    this.setState(prevState => ({
      plusMinusValue: prevState.plusMinusValue - 5,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  renderActivityItem(item = {}, index = -1) {
    const isHeader = _.isEmpty(item);
    let status;

    if (item.status === 1) {
      status = 'Upcoming';
    } else if (item.status === 2) {
      status = 'Pending';
    } else if (item.status === undefined) {
      status = 'Status';
    }

    const styleText = isHeader ? sg.colorGray11 : {};

    return (
      <Row key={index.toString()} style={[styles.activityRow, (isHeader ? styles.activityRowHeader : {})]}>
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{item.type || 'Type'}</Text>
        </Col>
        <Col style={[styles.activityCol]}>
          <Text style={[styles.activityColText, styleText]}>{item.date || 'Date'}</Text>
        </Col>
        <Col style={[styles.activityCol]}>
          {(status)
            ? <Text style={[styles.activityColText, sg.colorGray11, styleText]}>{status}</Text>
            : <BadgeCheckmark inverted />
          }
        </Col>
        <Col style={[styles.activityCol, sg.right]}>
          <Text style={[styles.activityColText, styleText]}>{item.amount || 'Amount'}</Text>
        </Col>
      </Row>
    );
  }

  render() {
    const { screenProps } = this.props;
    const { plusMinusValue, activity } = this.state;

    return (
      <View style={sg.mT25}>
        <Grid style={[sg.contentMarginH]}>
          <Col style={sg.mR10}>
            <Button
              iconRight
              block
              bordered
              dark
              onPress={() => {
                screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW, {
                  withdraw: true,
                });
              }}
            >
              <Text>Withdraw</Text>
            </Button>
          </Col>
          <Col>
            <Button
              iconRight
              block
              onPress={() => {
                screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW);
              }}
            >
              <Text>Deposit</Text>
              <Icon name="add" />
            </Button>
          </Col>
        </Grid>

        <View style={[sg.mT45]}>
          <H1 style={[sg.colorDark2, sg.fS24, sg.textCenter]}>Monthly Deposit</H1>
        </View>

        <Grid style={[sg.center, sg.contentMarginH]}>
          <Col style={[styles.plusMinusBl]}>
            <Button
              dark5
              disabled={!(plusMinusValue > 0)}
              onPress={this.btnMinus}
            >
              <Icon name="remove" />
            </Button>

            <View style={[sg.row]}>
              <Text style={styles.plusMinusValue}>$</Text>
              <Text style={styles.plusMinusValue}>{plusMinusValue}</Text>
            </View>

            <Button
              dark5
              onPress={this.btnPlus}
            >
              <Icon name="add" />
            </Button>
          </Col>
        </Grid>

        <View style={[sg.center, sg.mB55]}>
          <Text style={styles.collected}>Collected on the 20th</Text>
          <Text style={styles.nextCollection}>Next collection: 20 April</Text>
        </View>

        <View style={sg.contentMarginH2}>
          <H1 style={[sg.fS24, sg.textCenter, sg.mB30]}>Activity</H1>
          <Grid>
            {this.renderActivityItem()}
            {activity.map((item, index) => this.renderActivityItem(item, index))}
          </Grid>
        </View>
      </View>
    );
  }
}

export default Perfomance;
