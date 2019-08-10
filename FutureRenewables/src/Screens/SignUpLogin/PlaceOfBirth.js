
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
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
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
        { id: 1, name: 'Australia', },
        { id: 2, name: 'New Zealand', },
        { id: 3, name: 'United States of America (USA)', },
        { id: 4, name: 'Great Britain', },
        { id: 5, name: '--', },
        { id: 6, name: 'Afghanistan', },
        { id: 7, name: 'Albania', },
        { id: 8, name: 'Algeria', },
        { id: 9, name: 'Andorra', },
        { id: 10, name: 'Angola', },
        { id: 11, name: 'Anguilla', },
        { id: 12, name: 'Antigua & Barbuda', },
        { id: 13, name: 'Argentina', },
        { id: 14, name: 'Armenia', },
        { id: 15, name: 'Austria', },
        { id: 16, name: 'Azerbaijan', },
        { id: 17, name: 'Bahamas', },
        { id: 18, name: 'Bahrain', },
        { id: 19, name: 'Bangladesh', },
        { id: 20, name: 'Barbados', },
        { id: 21, name: 'Belarus', },
        { id: 22, name: 'Belgium', },
        { id: 23, name: 'Belize', },
        { id: 24, name: 'Benin', },
        { id: 25, name: 'Bermuda', },
        { id: 26, name: 'Bhutan', },
        { id: 27, name: 'Bolivia', },
        { id: 28, name: 'Bosnia & Herzegovina', },
        { id: 29, name: 'Botswana', },
        { id: 30, name: 'Brazil', },
        { id: 31, name: 'Brunei Darussalam', },
        { id: 32, name: 'Bulgaria', },
        { id: 33, name: 'Burkina Faso', },
        { id: 34, name: 'Burundi', },
        { id: 35, name: 'Cambodia', },
        { id: 36, name: 'Cameroon', },
        { id: 37, name: 'Canada', },
        { id: 38, name: 'Cape Verde', },
        { id: 39, name: 'Cayman Islands', },
        { id: 40, name: 'Central African Republic', },
        { id: 41, name: 'Chad', },
        { id: 42, name: 'Chile', },
        { id: 43, name: 'China', },
        { id: 44, name: 'China - Hong Kong / Macau', },
        { id: 45, name: 'Colombia', },
        { id: 46, name: 'Comoros', },
        { id: 47, name: 'Congo', },
        { id: 48, name: 'Congo, Democratic Republic of (DRC)', },
        { id: 49, name: 'Costa Rica', },
        { id: 50, name: 'Croatia', },
        { id: 51, name: 'Cuba', },
        { id: 52, name: 'Cyprus', },
        { id: 53, name: 'Czech Republic', },
        { id: 54, name: 'Denmark', },
        { id: 55, name: 'Djibouti', },
        { id: 56, name: 'Dominica', },
        { id: 57, name: 'Dominican Republic', },
        { id: 58, name: 'Ecuador', },
        { id: 59, name: 'Egypt', },
        { id: 60, name: 'El Salvador', },
        { id: 61, name: 'Equatorial Guinea', },
        { id: 62, name: 'Eritrea', },
        { id: 63, name: 'Estonia', },
        { id: 64, name: 'Eswatini', },
        { id: 65, name: 'Ethiopia', },
        { id: 66, name: 'Fiji', },
        { id: 67, name: 'Finland', },
        { id: 68, name: 'France', },
        { id: 69, name: 'French Guiana', },
        { id: 70, name: 'Gabon', },
        { id: 71, name: 'Gambia, Republic of The', },
        { id: 72, name: 'Georgia', },
        { id: 73, name: 'Germany', },
        { id: 74, name: 'Ghana', },
        { id: 75, name: 'Greece', },
        { id: 76, name: 'Grenada', },
        { id: 77, name: 'Guadeloupe', },
        { id: 78, name: 'Guatemala', },
        { id: 79, name: 'Guinea', },
        { id: 80, name: 'Guinea-Bissau', },
        { id: 81, name: 'Guyana', },
        { id: 82, name: 'Haiti', },
        { id: 83, name: 'Honduras', },
        { id: 84, name: 'Hungary', },
        { id: 85, name: 'Iceland', },
        { id: 86, name: 'India', },
        { id: 87, name: 'Indonesia', },
        { id: 88, name: 'Iran', },
        { id: 89, name: 'Iraq', },
        { id: 90, name: 'Israel and the Occupied Territories', },
        { id: 91, name: 'Italy', },
        { id: 92, name: 'Ivory Coast (Cote d\'Ivoire)', },
        { id: 93, name: 'Jamaica', },
        { id: 94, name: 'Japan', },
        { id: 95, name: 'Jordan', },
        { id: 96, name: 'Kazakhstan', },
        { id: 97, name: 'Kenya', },
        { id: 98, name: 'Korea, Democratic Republic of (North Korea)', },
        { id: 99, name: 'Korea, Republic of (South Korea)', },
        { id: 100, name: 'Kosovo', },
        { id: 101, name: 'Kuwait', },
        { id: 102, name: 'Kyrgyz Republic (Kyrgyzstan)', },
        { id: 103, name: 'Laos', },
        { id: 104, name: 'Latvia', },
        { id: 105, name: 'Lebanon', },
        { id: 106, name: 'Lesotho', },
        { id: 107, name: 'Liberia', },
        { id: 108, name: 'Libya', },
        { id: 109, name: 'Liechtenstein', },
        { id: 110, name: 'Lithuania', },
        { id: 111, name: 'Luxembourg', },
        { id: 112, name: 'Madagascar', },
        { id: 113, name: 'Malawi', },
        { id: 114, name: 'Malaysia', },
        { id: 115, name: 'Maldives', },
        { id: 116, name: 'Mali', },
        { id: 117, name: 'Malta', },
        { id: 118, name: 'Martinique', },
        { id: 119, name: 'Mauritania', },
        { id: 120, name: 'Mauritius', },
        { id: 121, name: 'Mayotte', },
        { id: 122, name: 'Mexico', },
        { id: 123, name: 'Moldova, Republic of', },
        { id: 124, name: 'Monaco', },
        { id: 125, name: 'Mongolia', },
        { id: 126, name: 'Montenegro', },
        { id: 127, name: 'Montserrat', },
        { id: 128, name: 'Morocco', },
        { id: 129, name: 'Mozambique', },
        { id: 130, name: 'Myanmar/Burma', },
        { id: 131, name: 'Namibia', },
        { id: 132, name: 'Nepal', },
        { id: 133, name: 'New Zealand', },
        { id: 134, name: 'Nicaragua', },
        { id: 135, name: 'Niger', },
        { id: 136, name: 'Nigeria', },
        { id: 137, name: 'North Macedonia, Republic of', },
        { id: 138, name: 'Norway', },
        { id: 139, name: 'Oman', },
        { id: 140, name: 'Pacific Islands', },
        { id: 141, name: 'Pakistan', },
        { id: 142, name: 'Panama', },
        { id: 143, name: 'Papua New Guinea', },
        { id: 144, name: 'Paraguay', },
        { id: 145, name: 'Peru', },
        { id: 146, name: 'Philippines', },
        { id: 147, name: 'Poland', },
        { id: 148, name: 'Portugal', },
        { id: 149, name: 'Puerto Rico', },
        { id: 150, name: 'Qatar', },
        { id: 151, name: 'Reunion', },
        { id: 152, name: 'Romania', },
        { id: 153, name: 'Russian Federation', },
        { id: 154, name: 'Rwanda', },
        { id: 155, name: 'Saint Kitts and Nevis', },
        { id: 156, name: 'Saint Lucia', },
        { id: 157, name: 'Saint Vincent and the Grenadines', },
        { id: 158, name: 'Samoa', },
        { id: 159, name: 'Sao Tome and Principe', },
        { id: 160, name: 'Saudi Arabia', },
        { id: 161, name: 'Senegal', },
        { id: 162, name: 'Serbia', },
        { id: 163, name: 'Seychelles', },
        { id: 164, name: 'Sierra Leone', },
        { id: 165, name: 'Singapore', },
        { id: 166, name: 'Slovak Republic (Slovakia)', },
        { id: 167, name: 'Slovenia', },
        { id: 168, name: 'Solomon Islands', },
        { id: 169, name: 'Somalia', },
        { id: 170, name: 'South Africa', },
        { id: 171, name: 'South Sudan', },
        { id: 172, name: 'Spain', },
        { id: 173, name: 'Sri Lanka', },
        { id: 174, name: 'Sudan', },
        { id: 175, name: 'Suriname', },
        { id: 176, name: 'Sweden', },
        { id: 177, name: 'Switzerland', },
        { id: 178, name: 'Syria', },
        { id: 179, name: 'Tajikistan', },
        { id: 180, name: 'Tanzania', },
        { id: 181, name: 'Thailand', },
        { id: 182, name: 'Netherlands', },
        { id: 183, name: 'Timor Leste', },
        { id: 184, name: 'Togo', },
        { id: 185, name: 'Trinidad & Tobago', },
        { id: 186, name: 'Tunisia', },
        { id: 187, name: 'Turkey', },
        { id: 188, name: 'Turkmenistan', },
        { id: 189, name: 'Turks & Caicos Islands', },
        { id: 190, name: 'Uganda', },
        { id: 191, name: 'Ukraine', },
        { id: 192, name: 'United Arab Emirates', },
        { id: 193, name: 'Uruguay', },
        { id: 194, name: 'Uzbekistan', },
        { id: 195, name: 'Venezuela', },
        { id: 196, name: 'Vietnam', },
        { id: 197, name: 'Virgin Islands (UK)', },
        { id: 198, name: 'Virgin Islands (US)', },
        { id: 199, name: 'Yemen', },
        { id: 200, name: 'Zambia', },
        { id: 201, name: 'Zimbabwe', },
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


          <KeyboardAvoidingView keyboardVerticalOffset={100}>
            <Button
              onPress={() => this.onNext()}
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
  hocNames.FORM,
])(PlaceOfBirth);

export default connect()(res);
