
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
  Picker,
} from 'src/Components/Form';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  sg,
} from 'src/Styles';

class PlaceOfBirth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        city: {
          validations: ['required'],
        },
        country: {
          value: 2,
          validations: ['required'],
        },
      },
      countries: [
        {
          id: 1,
          name: 'Australia',
        },
        {
          id: 2,
          name: 'Albania',
        },
      ],
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
      screenProps.navigateTo(routeNames.INITIAL_INVESTMENT_AMOUNT);
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { countries } = this.state;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Place of Birth
            </Text>

            <Input
              formData={form}
              helper="City / Town"
              formKey="city"
              onChangeText={hocs.handleInput}
            />

            <Picker
              formData={form}
              formKey="country"
              helper="Country"
              title="Australia"
              list={countries}
              renderItem={({ item }) => (
                <View>
                  <Text style={sg.pickerItemText}>{item.name}</Text>
                </View>
              )}
              onPressItem={({ item }, formKey, dataKey) => {
                hocs.handlePicker(item.name, formKey, dataKey);
                hocs.setFormTitle(item.name, formKey, dataKey);
              }}
            />

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
])(PlaceOfBirth);

export default connect()(res);
