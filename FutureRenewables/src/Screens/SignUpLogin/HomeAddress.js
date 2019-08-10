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
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

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
          addressLineOne: {
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
      // RecordId,
      AddressLine,
      // Country,
      // CountryCode,
      Postcode,
      Locality,
      // RecordId,
      State,
    } = item;

    const formValues = {
      addressLineOne: {
        value: AddressLine,
      },
      state: {
        value: State,
      },
      postcode: {
        value: Postcode,
      },
      suburb: {
        value: Locality,
      },
    };

    form[1] = _.merge(form[1], formValues);

    hocs.setForm(form);
    this.initManualForm();

    // this.retrieveAddress(RecordId);
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
      screenProps.navigateTo(routeNames.PLACE_OF_BIRTH);
    }
  }

  renderButtonNext() {
    const { showManualForm } = this.state;

    const button = (
      <Button
        onPress={() => this.handlePress()}
        block
        style={[sg.mT15]}
      >
        <Text>Next</Text>
      </Button>
    );

    if (!showManualForm) {
      return (
        <KeyboardAvoidingView keyboardVerticalOffset={100}>
          {button}
        </KeyboardAvoidingView>
      );
    }

    return button;
  }

  render() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;
    const { showManualForm } = this.state;

    return (
      <Content padder bounces={false} contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View style={sg.zIndex10}>
            <Text style={[sg.formHeading, sg.mB50]}>
              Home address
            </Text>

            {showManualForm
              ? (
                <View>
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    helper="Address Line 1"
                    formKey="addressLineOne"
                    onChangeText={hocs.handleInput}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    helper="Suburb"
                    formKey="suburb"
                    onChangeText={hocs.handleInput}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    helper="State"
                    formKey="state"
                    onChangeText={hocs.handleInput}
                  />
                  <Input
                    formData={form[1]}
                    dataKey={1}
                    helper="Postcode"
                    formKey="postcode"
                    onChangeText={hocs.handleInput}
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

          {this.renderButtonNext()}
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(HomeAddress);

export default connect()(res);
