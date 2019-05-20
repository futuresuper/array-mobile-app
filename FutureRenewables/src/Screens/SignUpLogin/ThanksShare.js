
import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  H1,
  H2,
  H3,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';

import {
  sg,
} from 'src/Styles';

import { ThanksShare as styles } from './styles';

class ThanksShare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOpacity: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // navigation.setParams({
    //   headerStyle: {
    //     opacity: 0.1,
    //   },
    // });
    // this.props.screenProps.spinnerShow();
  }

  hideOpacity() {

  }

  renderOpacity() {
    const { showOpacity } = this.state;

    if (!showOpacity) {
      return null;
    }

    return (
      <View style={styles.opacityBl}>
        <BadgeCheckmark
          style={styles.checkmark}
          styleTick={styles.checkmarkTick}
        />

        <Text style={sg.formHeading}>Thanks!</Text>
        <Text style={[sg.textCenter]}>
          Your spot in the August group
          {'\n'}
          is confirmed.
        </Text>
      </View>
    );
  }

  render() {

    return (
      <Content padder contentContainerStyle={sg.flex}>
        <H2>asd</H2>
        {this.renderOpacity()}
      </Content>
    );
  }
}

export default connect()(ThanksShare);
