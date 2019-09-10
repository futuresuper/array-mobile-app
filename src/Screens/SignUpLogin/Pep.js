
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class Pep extends Component {
  onNext(isPep = true) {
    const { screenProps } = this.props;
    const body = {
      pep: isPep,
    };


    if (isPep) {
      screenProps.Api.post('/user', body, () => {
        screenProps.navigateTo(routeNames.PEP_DESCRIPTION);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    } else {
      screenProps.Api.post('/user', body, () => {
        screenProps.navigateTo(routeNames.TAX_NUMBERS);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    }
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Are you a Politically Exposed Person?
            </Text>

            <Text style={sg.fS10}>
              A Politically Exposed Person (PEP) is an individual who holds a prominent public position or function in a government body
              or an international organisation in Australia or overseas,
              such as a Head of State, or Head of a Country or Government, or a Government Minister, or equivalent senior politician.
              A PEP can also be an immediate family member of a person referred to above, including spouse, de facto partner, child, and a child’s spouse or a parent.
              A close associate of a PEP,
              i.e. any individual who is known to have joint beneficial ownership of a legal arrangement or entity is also considered to be a PEP.
              Where you identify as, or have an association with, a PEP, we may request additional information from you.
            </Text>
          </View>


          <View>
            <Button
              onPress={() => this.onNext()}
              bordered
              dark
              block
              marginVert
            >
              <Text>Yes I am</Text>
            </Button>

            <Button
              onPress={() => this.onNext(false)}
              block
              marginVert
              style={sg.mB0}
            >
              <Text>No I&apos;m not</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

export default connect()(Pep);
