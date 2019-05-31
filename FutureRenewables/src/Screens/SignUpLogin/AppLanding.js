
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import Device from 'src/Common/device';

import {
  sg,
} from 'src/Styles';

// import landingCircle from './images/landingCircle.png';
// import landingArray from './images/landingArray.png';
import appLanding from './images/appLanding.png';
import poweredBy from './images/poweredBy.png';

import { appLanding as styles } from './styles';

class AppLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenHeight: Device.screenHeight(),
    };
  }

  handleLayout = () => {
    this.setState({
      screenHeight: Device.screenHeight(),
    });
  }

  render() {
    const { screenProps } = this.props;
    const { screenHeight } = this.state;

    return (
      <Content bounces={false}>
        <Image source={appLanding} style={[styles.image]} />

        <View style={[styles.topBl, { height: screenHeight }]} onLayout={this.handleLayout}>

          <Text style={styles.textMiddle}>
            A brighter
            {'\n'}
            future built
            {'\n'}
            by you
          </Text>

          <View style={[sg.width100p, sg.pH30, sg.aICenter]}>

            <Button
              block
              onPress={() => {
                screenProps.navigateTo(routeNames.BUILD_YOUR_SAVING);
              }}
            >
              <Text>Next</Text>
            </Button>

            <Image source={poweredBy} style={sg.mT20} />
          </View>
        </View>

        <View style={sg.disclaimerBl}>
          <Text style={sg.disclaimer}>ABOUT THE ARRAY APP</Text>
          <Text style={sg.disclaimer}>
            The Array app is a mobile app which will enable you to apply to invest in the Future Renewables Fund ARSN 628 987 842 (the&nbsp;
            <Text style={sg.disclaimerBold}>Fund</Text>
            ),
            and track your investment in the Fund.
            The Array app is published by Future Super Services Pty Ltd (ABN 34 619 076 023, AFS Representative No. 001255665),
            which is a Corporate Authorised Representative of Future Super Asset Management Limited (ABN 81 002 558 956, AFSL No. 238184).
            Information provided is of a general nature only. Future Super Services Pty Ltd is part of the Future Super Group (Future Super),
            and when we use words on this website like &apos;we&apos;, &apos;us&apos; or &apos;our&apos; it means Future Super.
            We recommend you seek professional financial advice when considering
            if financial products mentioned on this website are appropriate to your own objectives or financial needs.
            You can also view our privacy policy and&nbsp;
            <Text style={sg.disclaimerUnderline}>Financial Services Guide</Text>
            .
          </Text>

          <Text style={sg.disclaimerP}>ABOUT THE FUTURE RENEWABLES FUND</Text>
          <Text style={sg.disclaimer}>
            The responsible entity for the Future Renewables Fund ARSN 628 987 842 (the&nbsp;
            <Text style={sg.disclaimerBold}>Fund</Text>
            )
            is One Managed Investment Funds Limited (ABN 47 117 400 987) (AFSL 297 042) (
            <Text style={sg.disclaimerBold}>Responsible Entity </Text>
            or&nbsp;
            <Text style={sg.disclaimerBold}>OMIFL</Text>
            ).
            The Responsible Entity is the issuer of the Fund&apos;s&nbsp;
            <Text style={sg.disclaimerUnderline}>Product Disclosure Statement</Text>
            dated 8 March 2019 (
            <Text style={sg.disclaimerBold}>PDS</Text>
            ). The fund manager of the Fund is Future Super Services Pty Ltd (ABN 34 619 076 023,
            AFS Representative No. 001255665), which is a Corporate Authorised Representative of Future Super Asset Management Limited (ABN 81 002 558 956, AFSL 238184) (
            <Text style={sg.disclaimerBold}>Fund Manager</Text>
            ).
            The information contained in this website was not prepared by OMIFL but was prepared by other parties.
            While OMIFL has no reason to believe that the information is inaccurate,
            the truth or accuracy of the information contained therein cannot be warranted or guaranteed.
            This website should be regarded as general information only and not financial advice.
            Any one reading this website must obtain and rely upon their own independent advice and inquiries,
            both OMIFL and the Fund Manager do not guarantee the performance of the Fund or the repayment of any investor’s capital.
            Investors should consider the PDS before making any decision regarding the Fund.
            The
            <Text style={sg.disclaimerUnderline}> PDS </Text>
            contains important information about investing in the Fund and it is important investors obtain and read a copy of the
            PDS before making a decision about whether to acquire,
            continue to hold or dispose of units in the Fund.
          </Text>

          <Text style={[sg.disclaimerP, sg.mT50]}>
            We acknowledge the Traditional Owners of the land on which we work and live. We pay our respects to their Elders,
            past and present, and remember that sovereignty was never ceded.
          </Text>

          <Text style={sg.disclaimerP}>
            © 2019 Future Superannuation Group Pty Ltd
          </Text>

        </View>
      </Content>
    );
  }
}

export default connect()(AppLanding);
