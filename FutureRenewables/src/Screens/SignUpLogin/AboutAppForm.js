
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

import {
  userSelector,
} from 'src/Redux/AppContent';

import { aboutAppForm as styles } from './styles';

class AboutAppForm extends Component {
  onNext() {
    const { screenProps, user } = this.props;
    if (user.personalDetailsLocked) {
      screenProps.navigateTo(routeNames.PERSONAL_DETAILS_ALREADY_SUBMITTED)
    } else {
      screenProps.navigateTo(routeNames.ACCOUNT_TYPE);
    }
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[sg.formHeading, sg.mB30]}>
              About this application form
            </Text>

            <Text style={styles.description}>
              This Application Form accompanies the
              &nbsp;
              <Text style={styles.descriptionUnderline}>Product Disclosure Statement</Text>
              &nbsp;
              dated 8 March 2019 (PDS) issued by One Managed Investment Funds Limited ABN 47 117 400 987 (Issuer) in its capacity as responsible entity of the Future Renewables Fund (ARSN 628 987 842) (Fund).
              It is important that you read the PDS in full before investing.
            </Text>

            <Text style={styles.descriptionP}>
              Before deciding to invest in Future Renewables Fund (Fund) you should carefully consider your investment and financial objectives, level of experience,
              and risk appetite as set out in the relevant product disclosure statement (PDS) issued by One Managed Investment Funds Limited (OMIFL).
            </Text>

            <Text style={styles.descriptionP}>
              As an investor, you acknowledge that the investment in the Fund is subject to a degree of risk as disclosed in the PDS.
              No guarantees, either expressed or implied, are made that the investment strategies described herein will perform as they are intended.
              The fact the investment strategies described herein may have performed well in the past does not assure similar results in the future.
              There are no assurances that the Fund will be able to achieve its objectives.
            </Text>

            <Text style={[styles.descriptionP, sg.mB20]}>
              There are no loss limits or diversification requirements imposed upon the Fund except as expressly set forth in the Fund’s PDS.
            </Text>
          </View>


          <Button
            onPress={() => this.onNext()}
            block
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

AboutAppForm.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const user = userSelector(state);
  return {
    user,
  };
};


export default connect(mapStateToProps)(AboutAppForm);
