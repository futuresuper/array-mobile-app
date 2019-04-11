
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
  Badge,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import TextQuestion from 'src/Components/TextQuestion';

import {
  styleGlobal,
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

  render() {
    const { screenProps } = this.props;
    const { plusMinusValue, activity } = this.state;

    return (
      <View>
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
          <H1>Monthly Deposit</H1>
        </View>

        <Grid style={styleGlobal.center}>
          <Col style={styles.plusMinusBl}>
            <Button
              gray4
              disabled={!(plusMinusValue > 0)}
              onPress={this.btnMinus}
            >
              <Icon name="remove" />
            </Button>

            <View style={styleGlobal.row}>
              <Text style={styles.plusMinusValue}>$</Text>
              <Text style={styles.plusMinusValue}>{plusMinusValue}</Text>
            </View>

            <Button
              gray4
              onPress={this.btnPlus}
            >
              <Icon name="add" />
            </Button>
          </Col>
        </Grid>

        <View style={[styleGlobal.center, styleGlobal.mB50]}>
          <Text style={styles.collected}>Collected on the 20th</Text>
          <Text style={styles.nextCollection}>Next collection: 20 April</Text>
        </View>

        <View>
          <Grid>
            <Col style={[styles.activityCol]}>
              <Row>
                <H1 style={styles.activityTitle}>Activity</H1>
              </Row>
            </Col>
            <Col style={[styles.activityCol]}>
              <Row style={styleGlobal.mB10}>
                <TextQuestion text="Status" />
              </Row>
            </Col>
          </Grid>
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
      </View>
    );
  }
}

export default Perfomance;
