
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  View,
  Linking,
} from 'react-native';
import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

class JoinFutureSuper extends Component {
  goToAddress() {
    const { auth } = this.props;
    const { user } = auth;

    // eslint-disable-next-line max-len
    const url = `https://portal.myfuturesuper.com.au/join/?first_name=${user.firstName}&middle_names=${user.middleNames || ''}&last_name=${user.lastName}&email=${user.email}&mobile=${user.mobile.number}&utm_source=array&utm_campaign=array`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.center, sg.pB80]}>
        <Text style={[sg.headingM, sg.fS35, sg.colorDark3, sg.textCenter]}>
          {'Want to\ninvest even\nmore in\nrenewables?'}
        </Text>

        <Text style={[sg.textBold, sg.textCenter, sg.mT25, sg.mB80, sg.pH20]}>
          {"Future Super is Australias's most renewables-focused super fund. It's easy to switch to Future Super in just 3 minutes."}
        </Text>

        <View style={[sg.footerBl, sg.contentPadding]}>
          <Button block onPress={() => this.goToAddress()}>
            <Text>Join in a few minutes</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

JoinFutureSuper.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(mapStateToProps)(JoinFutureSuper);
