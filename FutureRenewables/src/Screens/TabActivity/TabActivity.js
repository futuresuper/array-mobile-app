
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

import {
  styleGlobal,
} from 'src/Styles';
import styles from './styles';

import Perfomance from './Perfomance';
import Investment from './Investment';


// eslint-disable-next-line react/prefer-stateless-function
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

        {segment.isPerfomance
          ? <Perfomance {...this.props} />
          : <Investment {...this.props} />
        }

      </Content>
    );
  }
}

export default connect()(TabActivity);
