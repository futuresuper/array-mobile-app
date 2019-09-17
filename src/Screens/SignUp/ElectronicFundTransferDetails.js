/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Clipboard,
} from 'react-native';
import {
  Content,
  Button,
  Grid,
  Col,
  Icon,
  Text,
} from 'native-base';
import { composeHoc, hocNames } from 'src/Common/Hocs';

import { random } from 'lodash';

import { routeNames } from 'src/Navigation';

import {
  sg,
  sc,
} from 'src/Styles';

class ElectronicFundTransferDetails extends React.Component {
    state={
      accountName: 'ONE REGISTRY SERVICES PTY LIMITED APPLICATIONS ACCOUNT 12',
      bsb: '332 127',
      accNo: '555 250 206',
      reference: '',
    }

    componentDidMount() {
      const { screenProps } = this.props;
      const { getUserInfo, account } = screenProps;
      const lname = getUserInfo().lastName;
      const accountRef = random(100, 999); // account.bankAccountNumber.slice(-3); when it becomes available from api
      const reference = `${lname}${accountRef}`;
      this.setState({ reference });
    }

    writeToClipboard = async (text) => {
      const { screenProps } = this.props;
      await Clipboard.setString(text);
      screenProps.toastSuccess('Copied to Clipboard!');
    };

    handleNext() {
      const { screenProps } = this.props;

      screenProps.Api.post(
        '/account',
        {
          advisedTransferMade: true,
        },
        () => {
          screenProps.navigateTo(routeNames.TAB_HOME);
        },
        () => {
          screenProps.toastDanger('Error. Try again.');
        },
      );
    }

    renderCopyContainer(key, value) {
      return (
        <Grid style={[sg.mT20, sg.bGWhite, sg.pV10, sg.pH10]}>
          <Col>
            <Text style={[sg.colorGray, sg.fS14, sg.mB10]}>{key}</Text>
            <Text style={[sg.textBold, sg.fS14]}>
              {value}
            </Text>
          </Col>
          <Col style={sg.width30}>
            <Icon style={{ color: sc.color.primary }} onPress={() => this.writeToClipboard(value)} type="MaterialIcons" name="content-copy" />
          </Col>
        </Grid>
      );
    }

    render() {
      const {
        accountName, bsb, accNo, reference,
      } = this.state;
      return (
        <Content padder contentContainerStyle={sg.flexGrow}>
          <View>
            <View style={[sg.left]}>
              <Text style={sg.formHeading}>
                {'Transfer Details'}
              </Text>
              <Text>
                {'To make your initial investment of $6,000 you’ll need to make an EFT. Tap to copy the below details to make the transfer.'}
              </Text>
            </View>
            {this.renderCopyContainer('ACCOUNT NAME', accountName)}
            <Text style={[sg.pV10, sg.fS12, sg.pH10]}>
              {"It's not issue if the full name doesn't quiet fit"}
            </Text>
            {this.renderCopyContainer('BSB', bsb)}
            {this.renderCopyContainer('Acc No.', accNo)}
            {this.renderCopyContainer('Reference', reference)}
          </View>
          <View style={sg.mT20}>
            <Button onPress={() => this.handleNext()} block marginVert>
              <Text>
                {"I've made the transfer"}
              </Text>
            </Button>
          </View>
        </Content>
      );
    }
}

const res = composeHoc([
  hocNames.FORM,
])(ElectronicFundTransferDetails);


export default connect()(res);
