
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
  H1,
} from 'native-base';

import Br from 'src/Components/Br';
import BottomInfo from 'src/Components/BottomInfo';

import {
  styleGlobal,
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

  render() {
    const { segment } = this.state;

    return (
      <Content padder>
        <View>
          <Button
            transparent
            iconRight
            style={styleGlobal.mB10}
            onPress={() => {
              BottomInfo.showAccounts({
                superAccount: false,
              });
            }}
          >
            <Text style={styles.title}>Grace</Text>
            <Icon name="ios-arrow-down" style={styles.titleIcon} />
          </Button>

          <H1 style={styles.mainAmount}>$1,978</H1>
        </View>

        <View style={[styleGlobal.mT30, styleGlobal.row]}>
          <Button
            transparent
            onPress={this.setPerfomanceSegment}
          >
            <Text style={[styleGlobal.pL0, (segment.isPerfomance ? {} : styleGlobal.colorGray)]}>Perfomance</Text>
          </Button>

          <Button
            transparent
            onPress={this.setInvestmentSegment}
          >
            <Text style={[styleGlobal.pL0, (segment.isInvestment ? {} : styleGlobal.colorGray)]}>Investment</Text>
          </Button>
        </View>

        <Br style={[styleGlobal.mB20]} />

        {segment.isPerfomance ? (
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
        ) : (
          <Investment {...this.props} />
        )}

        <Perfomance {...this.props} />

      </Content>
    );
  }
}

export default connect()(TabActivity);
