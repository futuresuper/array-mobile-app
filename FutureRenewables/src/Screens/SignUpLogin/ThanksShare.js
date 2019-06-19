
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Clipboard,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Content,
  Button,
  Text,
  ListItem,
  Body,
} from 'native-base';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';
import TextLink from 'src/Components/TextLink';
import signUpLoginUtils from 'src/Common/signUpLogin';
import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

import { ThanksShare as styles } from './styles';
import ThanksShareBottom from './images/ThanksShareBottom.png';

class ThanksShare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showThanks: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    const { screenProps } = this.props;

    screenProps.Api.get('/user',
      {},
      (res) => {
        this.setState({
          userInfo: res.user || {},
        });
      },
      () => {
        screenProps.toastDanger('Unknown error');
      }, false);


    this.hideShowThanks();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  setClipboard(string) {
    const { screenProps } = this.props;
    Clipboard.setString(string);
    screenProps.toast('Copied.');
  }

  hideShowThanks() {
    this.setState({
      showThanks: false,
    });
  }

  renderOpacity() {
    const { showThanks } = this.state;

    return (
      <Modal
        animationOutTiming={3000}
        animationOut="fadeOut"
        animationIn={{
          from: {
          },
          to: {
          },
        }}
        supportedOrientations={['landscape', 'portrait']}
        hasBackdrop={false}
        isVisible={showThanks}
        style={sg.m0}
      >
        <View style={styles.opacityBl}>
          <View style={[styles.thanksBl]}>
            <BadgeCheckmark
              style={styles.checkmark}
              styleTick={styles.checkmarkTick}
            />

            <Text style={[sg.formHeading, sg.aSCenter, sg.mT20, sg.mB20]}>Thanks!</Text>
            <Text style={[sg.textCenter, sg.fontMedium]}>
              Your spot in the&nbsp;
              <Text style={sg.textBold}>August</Text>
              &nbsp;group
              {'\n'}
              is&nbsp;
              <Text style={sg.textBold}>confirmed.</Text>
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderListItem(name, value) {
    return (
      <ListItem style={[sg.mL0, sg.mR0, sg.pR0, styles.borderListItem]}>
        <Body style={[sg.spaceBetween, sg.row]}>
          <Text style={[sg.mL0, sg.mR0, sg.fontMedium]}>{name}</Text>
          <Text style={[sg.mL0, sg.mR0, sg.textBold]}>{value}</Text>
        </Body>
      </ListItem>
    );
  }

  renderIndividual() {
    const { isFeat } = this.props;
    const { userInfo } = this.state;

    if (isFeat) {
      return null;
    }

    return (
      <View>
        <View style={[sg.mT20, sg.mB30]}>
          <ListItem style={[sg.mL0, styles.borderListItem]} />
          {this.renderListItem('Your early access group', userInfo.waitlistAccessGroup)}
          {this.renderListItem('Friends referred', '0')}
          {this.renderListItem('Referrals needed for July upgrade', '0')}
        </View>

        <Text style={[sg.textCenter, sg.fontMedium]}>
          Want to get in earlier?
          <Text style={sg.textBold}> Refer 5 friends </Text>
          with your unique code below and we’ll bump you up  the queue.
        </Text>

        <Button
          block
          bordered
          style={[sg.mV30]}
          onPress={() => this.setClipboard('UrName0199')}
        >
          <Text>UrName0199</Text>
        </Button>

        <Text style={[sg.colorGray11, sg.aSCenter, sg.fontMedium, sg.fS14]}>Tap to copy your referral code</Text>
      </View>
    );
  }

  renderFeatBottom() {
    const { isFeat } = this.props;

    if (!isFeat) {
      return null;
    }

    return (
      <View>
        <Button
          block
          bordered
          style={[sg.mV30]}
          onPress={() => this.setClipboard('arrayapp.co')}
        >
          <Text>arrayapp.co</Text>
        </Button>

        <Text style={[sg.colorGray11, sg.aSCenter, sg.fS14]}>Tap to copy and share the waitlist link</Text>
      </View>
    );
  }

  renderFeat() {
    const { isFeat } = this.props;
    const { userInfo } = this.state;

    if (!isFeat) {
      return null;
    }

    return (
      <View>
        <View>
          <View style={[sg.mT20, sg.mB30]}>
            <ListItem style={[sg.mL0, styles.borderListItem]} />
            {this.renderListItem('Artist VIP early\n access group', userInfo.waitlistAccessGroup)}
          </View>

          <View>
            <Text>
              If you have any questions feel free to get in touch with Heidi at&nbsp;
              <TextLink email="heidi@feat.ldt">heidi@feat.ldt</TextLink>
            </Text>

          </View>
        </View>

      </View>
    );
  }

  render() {
    const { isFeat } = this.props;
    const { userInfo } = this.state;
    let fullName = '';

    if (isFeat) {
      fullName = 'Artist Name';
    } else {
      fullName = `${userInfo.firstName} ${userInfo.lastName}`;
    }

    return (
      <Content padder contentContainerStyle={sg.flexGrow} bounces={false}>
        {this.renderOpacity()}
        <View style={[sg.spaceBetween, sg.pB60]}>
          <View>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>{fullName ? fullName.charAt(0) : ''}</Text>
            </View>
            <Text style={[sg.aSCenter, sg.mT10, sg.fS35, sg.textBold]}>
              {fullName}
            </Text>

            {this.renderIndividual()}
            {this.renderFeat()}

            <Button
              small
              onPress={() => {
                // eslint-disable-next-line react/destructuring-assignment
                this.props.screenProps.navigateTo(routeNames.TAB_HOME);
              }}
            >
              <Text>next</Text>
            </Button>
          </View>

          {this.renderFeatBottom()}
        </View>

        <Image source={ThanksShareBottom} style={styles.imageBottom} />
      </Content>
    );
  }
}

ThanksShare.propTypes = {
  isFeat: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { isFeat } = signUpLoginUtils.getAccountType(ownProps.navigation);

  return {
    isFeat,
  };
};

export default connect(mapStateToProps)(ThanksShare);
