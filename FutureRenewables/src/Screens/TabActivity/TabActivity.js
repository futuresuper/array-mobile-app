
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

  render() {
    const { segment } = this.state;

    return (
      <Content padder>
        <View style={[sg.aICenter, sg.mT50, sg.mB25]}>
          <Button
            transparent
            iconRight
            style={sg.aSCenter}
            onPress={() => {
              BottomInfo.showAccounts({
                superAccount: false,
              });
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

        <View style={[sg.mT30, sg.row]}>
          <Button
            transparent
            onPress={this.setPerfomanceSegment}
          >
            <Text style={[sg.pL0, sg.fS20, sg.colorDark2, sg.fontRegular, (segment.isPerfomance ? sg.textBold : sg.colorGray12)]}>Perfomance</Text>
          </Button>

          <Button
            transparent
            onPress={this.setInvestmentSegment}
          >
            <Text style={[sg.pL0, sg.fS20, sg.colorDark2, sg.fontRegular, (segment.isInvestment ? sg.textBold : sg.colorGray12)]}>Investment</Text>
          </Button>
        </View>

        <Br style={[sg.mB20]} />

        {segment.isPerfomance ? (
          <View style={sg.mT2012}>
            <Text style={sg.colorGray3}>
              Since you&apos;ve joined, you&apos;ve made
              <Text style={sg.textBold}> $600 </Text>
              and your account is up
              <Text style={sg.textBold}> 4.6% </Text>
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
