
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';

// import { BottomInfo } from 'src/Components/BottomInfo';
import {
  routeNames,
} from 'src/Navigation';
import signUpLoginUtils from 'src/Common/signUpLogin';

import {
  applicationIdSave,
} from 'src/Redux/Auth';

import { userSelector } from 'src/Redux/AppContent';

import {
  sg,
} from 'src/Styles';

class AccountType extends React.Component {
    state = {
      // isBottomOpened: false,
    };


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

  // openBottomInfo = () => {
  //   this.BottomInfo.show();

  //   this.setState({
  //     isBottomOpened: true,
  //   });
  // }

  onButtonPress(appType) {
    const { screenProps, applicationIdSaveConnect, user } = this.props;

    screenProps.Api.post('/account', {}, (res) => {
      applicationIdSaveConnect(res);
      if (user.personalDetailsLocked) {
        screenProps.navigateTo(routeNames.PERSONAL_DETAILS_ALREADY_SUBMITTED);
      } else {
        screenProps.navigateTo(routeNames.NAME);
      }
    }, () => {
      screenProps.toast('Error. Try again.');
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
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Account type
            </Text>

            <Text style={sg.formHeadingDescription}>
              What sort of account would you like to start?
            </Text>
          </View>

          <View>
            <Button
              onPress={() => this.onButtonPress("individual")}
              block
              marginVert
              style={sg.mT0}
            >
              <Text>Individual</Text>
            </Button>

            <Button
              bordered
              dark
              block
              marginVert
            >
              <Text>Other types coming soon...</Text>
            </Button>

            {/*
            <Button
              // onPress={this.onFeat}
              bordered
              dark
              block
              marginVert
            >
              <Text>FEAT. Artist / Music Industry</Text>
            </Button>

            <Button
              bordered
              dark
              block
              marginVert
            >
              <Text>Company / Partnership (Coming Soon...)</Text>
            </Button>

            <Button
              bordered
              dark
              block
              marginVert
            >
              <Text>Joint (Coming Soon...)</Text>
            </Button>

            <Button
              bordered
              dark
              block
              marginVert
            >
              <Text>Adult for child (Coming Soon...)</Text>
            </Button>

            <Button
              bordered
              dark
              block
              marginVert
            >
              <Text>SMSF / Trust / Super Fund (Coming Soon...)</Text>
            </Button>
*/}
          </View>
        </View>
      </Content>
    );
  }

  // render() {
  //   const { isBottomOpened } = this.state;

  //   return (
  //     <Content padder contentContainerStyle={[sg.flexGrow, sg.pB0, sg.pH0]} bounces={false}>
  //       <View style={[sg.spaceBetween]}>
  //         <View style={[sg.contentPaddingH]}>
  //           <Text style={sg.formHeading}>
  //           Your account
  //           </Text>

  //           <Text>
  //             {isBottomOpened ? 'What sort of account would you like to start?' : 'Who are you interested in setting an account up as?'}
  //           </Text>

  //         </View>

  //         <View>
  //           <View style={[sg.contentPadding, sg.pT0]}>
  //             <Button
  //               onPress={this.onMyself}
  //               block
  //             >
  //               <Text>Myself</Text>
  //             </Button>

  //             <Button
  //               style={[sg.mT20, sg.mB0]}
  //               onPress={this.onFeat}
  //               bordered
  //               dark
  //               block
  //               iconRight
  //             >
  //               <Text>FEAT. Artist / Music Industry</Text>
  //               <Icon type="EvilIcons" name="question" style={[sg.colorGray11, sg.fS30]} onPress={this.openBottomInfo} />
  //             </Button>
  //           </View>

  //           <BottomInfo
  //             ref={(c) => {
  //               if (c) this.BottomInfo = c;
  //             }}
  //             onClose={() => {
  //               this.setState({
  //                 isBottomOpened: false,
  //               });
  //             }}
  //           >
  //             <View style={sg.aICenter}>
  //               <H2 style={[sg.headingXS, sg.colorDark2, sg.mT0]}>What is FEAT.?</H2>

  //               <Text style={[sg.textCenter, sg.mT20, sg.mB20]}>
  //               FEAT (Future Energy Artists) are a group of Australia’s top musical artists investing
  //               in renewables as a powerful response to the reality of climate change.
  //               </Text>
  //               <Text style={sg.textCenter}>
  //               If you’re an artist / music industry considering investing, please choose this option (even if you might like to also start a personal account).
  //               </Text>
  //             </View>
  //           </BottomInfo>
  //         </View>


  //       </View>
  //     </Content>
  //   );
  // }
}

AccountType.propTypes = {
  applicationIdSaveConnect: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  applicationIdSaveConnect: applicationIdSave,
};

const mapStateToProps = state => {
  const user = userSelector(state);
  return {
    user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountType);
