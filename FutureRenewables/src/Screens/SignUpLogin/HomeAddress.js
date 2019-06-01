import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';

import {
  Content,
  Button,
  Text,
} from 'native-base';

import _ from 'lodash';

import {
  sg,
} from 'src/Styles';

import {
  routeNames,
} from 'src/Navigation';
import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';
import Address from 'src/Components/Address';

class HomeAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [
        {
          address: {
            validations: ['required'],
          },
        },
        {
          unitNumber: {
            validations: ['required'],
          },
          streetNumber: {
            validations: ['required'],
          },
          streetName: {
            validations: ['required'],
          },
          streetType: {
            validations: ['required'],
          },
          suburb: {
            validations: ['required'],
          },
          state: {
            validations: ['required'],
          },
          postcode: {
            validations: ['required'],
          },
          country: {
            validations: ['required'],
          },
        },
      ],
      showManualForm: false,
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  onPressListItem = (item) => {
    const { hocs } = this.props;
    const { form } = this.state;
    const {
      RecordId,
      // AddressLine,
      Country,
      // CountryCode,
      Postcode,
      Locality,
      // RecordId,
      State,
    } = item;

    const formValues = {
      state: {
        value: State,
      },
      postcode: {
        value: Postcode,
      },
      country: {
        value: Country,
      },
      suburb: {
        value: Locality,
      },
    };

    form[1] = _.merge(form[1], formValues);

    hocs.setForm(form);
    this.initManualForm();

    this.retrieveAddress(RecordId);
  }

  retrieveAddress(recordId) {
    const { form } = this.state;
    const { screenProps, hocs } = this.props;

    screenProps.Api.get('/addressdetails',
      {
        paf: recordId,
      },
      (res) => {
        if (!res || !res.addressDetails) {
          return;
        }

        const {
          UnitNumber,
          StreetNumber1,
          StreetName,
          StreetType,
        } = res.addressDetails;

        const formValues = {
          unitNumber: {
            value: UnitNumber,
          },
          streetNumber: {
            value: StreetNumber1,
          },
          streetName: {
            value: StreetName,
          },
          streetType: {
            value: StreetType,
          },
        };

        form[1] = _.merge(form[1], formValues);

        hocs.setForm(form);
      }, null, false);
  }

  initManualForm() {
    this.setState({
      showManualForm: true,
    });
  }

  handlePress() {
    const { screenProps, hocs } = this.props;
    const { showManualForm } = this.state;
    const formKey = showManualForm ? 1 : 0;

    const formIsValid = hocs.formIsValid(formKey);
    if (formIsValid) {
      screenProps.navigateTo(routeNames.NOTIFICATIONS);
    }
  }

  render() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;
    const { showManualForm } = this.state;

    return (
      <Content padder bounces={false} contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading, sg.mB50]}>
              Home address
            </Text>

            {showManualForm
              ? (
                <View>
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Unit Number"
                    formKey="unitNumber"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Streen Number"
                    formKey="streetNumber"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Street Name"
                    formKey="streetName"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Street Type"
                    formKey="streetType"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Suburb"
                    formKey="suburb"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="State"
                    formKey="state"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Postcode"
                    formKey="postcode"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    placeholder="Country"
                    formKey="country"
                    onChangeText={hocs.handleInput}
                    itemProps={{
                      marginBottom: true,
                    }}
                  />
                </View>
              )
              : (
                <Address
                  onPressItem={this.onPressListItem}
                  inputProps={{
                    formData: ((form && form[0]) ? form[0] : null),
                    dataKey: 0,
                    formKey: 'address',
                    onChangeText: hocs.handleInput,
                  }}
                  Api={screenProps.Api}
                />
              )
            }

          </View>
          <Button
            onPress={() => this.handlePress()}
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
  'FormHoc',
])(HomeAddress);

export default connect()(res);
