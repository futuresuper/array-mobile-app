
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  H2,
} from 'native-base';

import {
  styleGlobal,
} from 'src/Styles';

import solarFarmCircle from 'src/assets/images/solarFarmCircle.png';
import styles from './styles';

class JoinSuper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePress() {
    const { screenProps } = this.props;
    screenProps.navigateTo('hehe');
  }

  render() {
    return (
      <Content padder>
        <View style={[styleGlobal.center, styleGlobal.mH20]}>
          <Text style={styleGlobal.formHeading}>
           You&apos;re all set up!
          </Text>

          <Text style={styleGlobal.textDescription}>
            We&apos;ll be in touch if we need any more information to complete your application or ID verification
          </Text>

          <Image
            source={solarFarmCircle}
            style={styles.solarFarmCircle}
          />

          <H2 style={[styleGlobal.textCenter, styleGlobal.colorGray]}>
          Want to invest even more in renewables?
          </H2>

          <Text style={[styleGlobal.textCenter, styleGlobal.textBold, styleGlobal.mT10, styleGlobal.mB30]}>
          Now we’ve got those details, you can join Future Super in just a few clicks
          </Text>

          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Join Future Super</Text>
          </Button>


        </View>
      </Content>
    );
  }
}

export default connect()(JoinSuper);
