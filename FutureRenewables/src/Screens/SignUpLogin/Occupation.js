
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

class Occupation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        occupation: {
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
      const body = {
        birthCityTown: hocs.form.occupation.value,
      };
      screenProps.Api.post('/user', body, () => {
        screenProps.navigateTo(routeNames.PEP);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
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
              Occupation
            </Text>

            <Input
              formData={form}
              formKey="occupation"
              helper="Occupation"
              onChangeText={hocs.handleInput}
            />
          </View>


          <View>
            <Button
              onPress={() => this.onNext()}
              bordered
              dark
              block
              marginVert
            >
              <Text>Not currently employed</Text>
            </Button>

            <Button
              onPress={() => this.onNext()}
              bordered
              dark
              block
              marginVert
            >
              <Text>Student</Text>
            </Button>

            <Button
              onPress={() => this.onNext()}
              bordered
              dark
              block
              marginVert
            >
              <Text>Retired</Text>
            </Button>

            <Button
              onPress={() => this.onNext()}
              block
              marginVert
              style={sg.mB0}
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
])(Occupation);

export default connect()(res);
