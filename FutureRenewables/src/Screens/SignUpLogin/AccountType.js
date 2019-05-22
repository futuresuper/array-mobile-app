
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Button,
  Icon,
  H2,
} from 'native-base';

import { BottomInfo } from 'src/Components/BottomInfo';
import {
  routeNames,
} from 'src/Navigation';
import signUpLoginUtils from 'src/Common/signUpLogin';

import {
  sg,
} from 'src/Styles';

class AccountType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBottomOpened: false,
    };
  }

  onMyself = () => {
    const { screenProps } = this.props;

    this.saveDatabase(signUpLoginUtils.ACCOUNT_TYPE.INDIVIDUAL, () => {
      screenProps.navigateTo(routeNames.NAME);
    });
  }

  onFeat = () => {
    const { screenProps } = this.props;

    this.saveDatabase(signUpLoginUtils.ACCOUNT_TYPE.FEAT, () => {
      screenProps.navigateTo(routeNames.ARTIST_NAME);
    });
  }

  openBottomInfo = () => {
    this.BottomInfo.show();

    this.setState({
      isBottomOpened: true,
    });
  }

  saveDatabase(type, onSuccess) {
    const { screenProps } = this.props;

    screenProps.Api.post('/user', {
      waitlistAccountType: type,
    }, onSuccess, () => {
      screenProps.toast('Error. Try again.');
    });
  }

  render() {
    const { isBottomOpened } = this.state;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pB0, sg.pH0]} bounces={false}>
        <View style={[sg.spaceBetween]}>
          <View style={[sg.contentPaddingH]}>
            <Text style={sg.formHeading}>
            Your account
            </Text>

            <Text>
              {isBottomOpened ? 'What sort of account would you like to start?' : 'Who are you interested in setting an account up as?'}
            </Text>

          </View>

          <View>
            <View style={sg.contentPadding}>
              <Button
                onPress={this.onMyself}
                block
              >
                <Text>Myself</Text>
              </Button>

              <Button
                style={[sg.mT30, sg.mB10]}
                onPress={this.onFeat}
                bordered
                dark
                block
                iconRight
              >
                <Text>FEAT. Artist / Music Industry</Text>
                <Icon type="EvilIcons" name="question" style={[sg.colorDark3, sg.fS30]} onPress={this.openBottomInfo} />
              </Button>
            </View>

            <BottomInfo
              ref={(c) => {
                if (c) this.BottomInfo = c;
              }}
              onClose={() => {
                this.setState({
                  isBottomOpened: false,
                });
              }}
            >
              <View style={sg.aICenter}>
                <H2>What is FEAT.?</H2>

                <Text style={[sg.textCenter, sg.mV10]}>
                FEAT (Future Energy Artists) are a group of Australia’s top musical artists investing
                in renewables as a powerful response to the reality of climate change.
                </Text>
                <Text style={sg.textCenter}>
                If you’re an artist / music industry considering investing, please choose this option (even if you might like to also start a personal account).
                </Text>
              </View>
            </BottomInfo>
          </View>


        </View>
      </Content>
    );
  }
}

export default connect()(AccountType);
