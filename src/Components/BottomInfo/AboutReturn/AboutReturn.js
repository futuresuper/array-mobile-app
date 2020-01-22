
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  H2,
  Row,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class AboutReturn extends Component {
  renderInfoRow(textLeft, textRight) {
    return (
      <Row>
        <Text style={styles.textBold}>
          {`${textLeft}:`}
          &nbsp;
        </Text>
        <Text style={styles.text}>{textRight}</Text>
      </Row>
    );
  }

  render() {
    return (
      <View style={sg.mH5}>
        <H2 style={[sg.fS20, sg.colorDark2textCenter, sg.mL5]}>
          About the Target Return
        </H2>

        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            activeOpacity={1}
          >
            <Text style={[styles.text, sg.mT15]}>
            The Fund Manager has a reasonable basis for setting the target return,
            however it is a ‘target’ only.  It is not intended as a projection of likely
            future returns and is not a guarantee. The value of your investment can
            rise and fall. Please refer to the PDS for further information.
            Past performance is not an indicator of future performance.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default AboutReturn;
