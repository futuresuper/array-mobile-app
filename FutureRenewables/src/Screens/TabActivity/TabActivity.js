
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
} from 'react-native';

import {
  Button,
  Text,
  Content,
} from 'native-base';

import Br from 'src/Components/Br';
import BottomInfo from 'src/Components/BottomInfo';
import Balance from 'src/Components/Balance';

import GraphExample2 from 'src/assets/images/GraphExample2.png';
import CircleSunrise from 'src/assets/images/CircleSunrise.png';
// import CircleDay from 'src/assets/images/CircleDay.png';
// import CircleSunset from 'src/assets/images/CircleSunset.png';
// import CircleNight from 'src/assets/images/CircleNight.png';

import {
  sg,
} from 'src/Styles';
import styles from './styles';

import Perfomance from './Perfomance';
import Investment from './Investment';

class TabActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      segment: {
        isPerfomance: true,
        isInvestment: false,
      },
    };
  }

  setPerfomanceSegment = () => {
    this.setState({
      segment: {
        isPerfomance: true,
        isInvestment: false,
      },
    });
  }

  setInvestmentSegment = () => {
    this.setState({
      segment: {
        isPerfomance: false,
        isInvestment: true,
      },
    });
  }

  renderChart() {
    return (
      <View style={[sg.contentMarginH2]}>

        <View style={[styles.activityChartBl, sg.aICenter]}>
          <Image source={GraphExample2} style={styles.activityGraphExample} />
          <Image source={CircleSunrise} style={styles.activityCircleDay} />
        </View>
        <View style={[sg.row, sg.spaceBetween]}>
          <Text style={[sg.fS14, sg.fontMedium, sg.colorDark2]}>Jul</Text>
          <Text style={[sg.fS14, sg.fontMedium, sg.colorDark2]}>Nov</Text>
        </View>
      </View>
    );
  }

  render() {
    const { segment } = this.state;

    return (
      <Content>
        <Balance
          onPress={() => {
            BottomInfo.showAccounts({
              superAccount: false,
            });
          }}
        />

        <View style={[sg.contentMarginH2, sg.mT30, sg.mB30]}>
          <Br style={[sg.footerBl]} />

          <View style={[sg.mH20, sg.row]}>
            <Button
              transparent
              onPress={this.setPerfomanceSegment}
              style={[styles.activityTabTitleBl, (segment.isPerfomance ? styles.activityTabTitleBlActive : {}), sg.mR70]}
            >
              <Text style={[styles.activityTabTitleTextActive, (!segment.isPerfomance ? styles.activityTabTitleText : {})]}>Perfomance</Text>
            </Button>

            <Button
              transparent
              onPress={this.setInvestmentSegment}
              style={[styles.activityTabTitleBl, (segment.isInvestment ? styles.activityTabTitleBlActive : {})]}
            >
              <Text style={[styles.activityTabTitleTextActive, (!segment.isInvestment ? styles.activityTabTitleText : {})]}>Investment</Text>
            </Button>
          </View>

        </View>


        {segment.isPerfomance ? (
          <View>
            <Text style={[sg.fontMedium, sg.contentMarginH]}>
              Since you&apos;ve joined, you&apos;ve made
              <Text style={[sg.textBold]}> $600 </Text>
              and your account is up
              <Text style={[sg.textBold]}> 4.6% </Text>
              .
              {'\n'}
              Sweeet.
            </Text>
            {this.renderChart()}
          </View>
        ) : (
          <Investment {...this.props} />
        )}

        <Perfomance {...this.props} />

      </Content>
    );
  }
}

export default connect()(TabActivity);
