
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
  Input,
} from 'src/Components/Form';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  sg,
} from 'src/Styles';

class PepDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        description: {
          validations: ['required'],
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  onNext() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo(routeNames.TAX_NUMBERS);
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              PEP Description
            </Text>

            <Input
              formData={form}
              formKey="description"
              helper="PEP Description"
              onChangeText={hocs.handleInput}
            />

            <Text style={[sg.fS10, sg.mT30]}>
              A Politically Exposed Person (PEP) is an individual who holds a prominent public position or function in a government body
              or an international organisation in Australia or overseas, such as a Head of State, or Head of a Country or Government,
              or a Government Minister, or equivalent senior politician.
              A PEP can also be an immediate family member of a person referred to above, including spouse, de facto partner, child,
              and a child’s spouse or a parent. A close associate of a PEP,
              i.e. any individual who is known to have joint beneficial ownership of a legal arrangement or entity is also considered to be a PEP.
              Where you identify as, or have an association with, a PEP, we may request additional information from you.
            </Text>
          </View>


          <View>
            <Button
              onPress={() => this.onNext()}
              block
            >
              <Text>Next</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(PepDescription);

export default connect()(res);
