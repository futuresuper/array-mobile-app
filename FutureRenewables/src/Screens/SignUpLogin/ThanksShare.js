
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Modal,
  Clipboard,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  ListItem,
  Body,
} from 'native-base';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';

import {
  sg,
} from 'src/Styles';

import { ThanksShare as styles } from './styles';

class ThanksShare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showThanks: true,
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({
        showThanks: false,
      });
    }, 3000);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  renderOpacity() {
    const { showThanks } = this.state;

    if (!showThanks) {
      return null;
    }

    return (
      <Modal
        animationType="none"
        onRequestClose={() => {

        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible
      >
        <View style={styles.opacityBl}>
          <View style={[styles.thanksBl]}>
            <BadgeCheckmark
              style={styles.checkmark}
              styleTick={styles.checkmarkTick}
            />

            <Text style={[sg.formHeading, sg.aSCenter]}>Thanks!</Text>
            <Text style={[sg.textCenter]}>
              Your spot in the August group
              {'\n'}
              is confirmed.
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderListItem(name, value) {
    return (
      <ListItem style={[sg.mL0, sg.mR0, styles.borderListItem]}>
        <Body style={[sg.spaceBetween, sg.row]}>
          <Text>{name}</Text>
          <Text style={sg.textBold}>{value}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    const { screenProps } = this.props;

    return (
      <Content padder>
        {this.renderOpacity()}
        <View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>A</Text>
          </View>
          <Text style={[sg.aSCenter, sg.fS30, sg.mT10]}>Andrew Sellen</Text>


          <View style={[sg.mT20, sg.mB30]}>
            <ListItem style={[sg.mL0, styles.borderListItem]} />
            {this.renderListItem('Your early access group', 'August 19')}
            {this.renderListItem('Friends referred', '0')}
            {this.renderListItem('Referrals needed for July upgrade', '0')}
          </View>

          <Text style={sg.textCenter}>
            Want to get in earlier?
            <Text style={sg.textBold}> Refer 5 friends </Text>
            with your unique code below and we’ll bump you up  the queue.
          </Text>

          <Button
            block
            bordered
            style={[sg.mV30]}
            onPress={() => {
              Clipboard.setString('UrName0199');
              screenProps.toast('Copied.');
            }}
          >
            <Text>UrName0199</Text>
          </Button>

          <Text style={[sg.colorGray11, sg.aSCenter]}>Tap to copy your referral code</Text>
        </View>
      </Content>
    );
  }
}

export default connect()(ThanksShare);
