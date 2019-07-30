
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

class TaxNumbers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        asdasd: {
          validations: ['required'],
        },
      },
    };
  }

  componentDidUpdate() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  onNext() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
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
              Tax Numbers
            </Text>

            {/* <Input
              formData={form}
              formKey="tfn"
              helper="Your Australian Tax File Number (TFN)"
              onChangeText={hocs.handleInput}
            /> */}
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

const res = composeHoc([
  hocNames.FORM,
])(TaxNumbers);

export default connect()(res);
