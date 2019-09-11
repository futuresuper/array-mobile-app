import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';

import {
  Content,
  Button,
  Text,
  Icon,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import composeHoc from 'src/Common/Hocs';
import {
  Input,
  Picker,
} from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

import {
  sg,
} from 'src/Styles';

class Name extends React.Component {
    state = {
      form: {
        /*
        title: {
          value: '',
        },
        */
        firstName: {
          value: '',
          validations: [
            'required',
          ],
        },
        middleNames: {
          value: '',
        },
        lastName: {
          value: '',
          validations: [
            'required',
          ],
        },
      },
      titles: [
        {
          id: 1,
          name: 'Mr',
        },
        {
          id: 2,
          name: 'Ms',
        },
        {
          id: 3,
          name: 'Mrs',
        },
        {
          id: 4,
          name: 'Miss',
        },
        {
          id: 5,
          name: 'Dr',
        },
        {
          id: 6,
          name: 'Other',
        },
      ],
    }

    componentDidMount() {
      const { hocs } = this.props;
      const { form } = this.state;

      hocs.setForm(form);
    }

    handlePress() {
      const { screenProps, hocs } = this.props;

      const formIsValid = hocs.formIsValid();
      if (formIsValid) {
        const firstName = hocs.form.firstName.value;
        const middleNames = hocs.form.middleNames.value;
        const lastName = hocs.form.lastName.value;

        screenProps.Api.post('/user', {
          firstName,
          middleNames,
          lastName,
        }, () => {
          //screenProps.navigateTo(routeNames.EMAIL);
          screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
        }, () => {
          screenProps.toastDanger('Error. Try Again');
        });
      }
    }

    render() {
      const { hocs } = this.props;
      const { form } = hocs;
      const { titles } = this.state;

      return (
        <Content padder contentContainerStyle={sg.flexGrow}>
          <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading]}>
              Your name
            </Text>

            {/*
            <Picker
              containerStyle={sg.width100}
              formData={form}
              formKey="title"
              helper="Title"
              title="Title 1"
              list={titles}
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
            */}

            <Input
              formData={form}
              formKey="firstName"
              helper="First name"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="middleNames"
              helper="Middle names"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="lastName"
              helper="Last name"
              onChangeText={hocs.handleInput}
            />

          </View>
          <KeyboardAvoidingView>
            <Button
              onPress={() => this.handlePress()}
              block
            >
              <Text>Next</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
        </Content>
      );
    }
}

const res = composeHoc([
  'FormHoc',
])(Name);

export default connect()(res);
