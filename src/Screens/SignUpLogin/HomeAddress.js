import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { Content, Button, Text } from 'native-base';

import _ from 'lodash';

import { sg } from 'src/Styles';

import { routeNames } from 'src/Navigation';
import composeHoc from 'src/Common/Hocs';
import { Input, Picker } from 'src/Components/Form';
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
          unitNumber: {
            //validations: ['required'],
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
        },
      ],
      states: [
        { id: 1, name: 'NSW' },
        { id: 2, name: 'VIC' },
        { id: 3, name: 'QLD' },
        { id: 4, name: 'WA' },
        { id: 5, name: 'SA' },
        { id: 6, name: 'TAS' },
        { id: 7, name: 'ACT' },
        { id: 8, name: 'NT' },
      ],
      streetTypes: [
        { value: 'AVE', name: 'Avenue' },
        { value: 'BVD', name: 'Boulevard' },
        { value: 'CIR', name: 'Circle' },
        { value: 'CCT', name: 'Circuit' },
        { value: 'CL', name: 'Close' },
        { value: 'CT', name: 'Court' },
        { value: 'CRES', name: 'Crescent' },
        { value: 'DR', name: 'Drive' },
        { value: 'ESP', name: 'Esplanade' },
        { value: 'EXP', name: 'Expressway' },
        { value: 'HWY', name: 'Highway' },
        { value: 'LANE', name: 'Lane' },
        { value: 'MWY', name: 'Motorway' },
        { value: 'PDE', name: 'Parade' },
        { value: 'PL', name: 'Place' },
        { value: 'RD', name: 'Road' },
        { value: 'SQ', name: 'Square' },
        { value: 'ST', name: 'Street' },
        { value: 'TCE', name: 'Terrace' },
        { value: 'WAY', name: 'Way' },
        { value: 'Other', name: 'Other' },
      ],
      showManualForm: false,
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  onPressListItem = item => {
    const { hocs } = this.props;
    const { form } = this.state;
    const { RecordId, AddressLine, Postcode, Locality, State } = item;
    this.retrieveAddress(RecordId);
    const formValues = {
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
  };

  retrieveAddress = recordId => {
    const { form } = this.state;
    const { screenProps, hocs } = this.props;

    screenProps.Api.get(
      '/addressdetails',
      {
        paf: recordId,
      },
      res => {
        if (!res || !res.addressDetails) {
          return;
        }

        const { UnitNumber, StreetNumber1, StreetName, StreetType } = res.addressDetails;

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
      },
      null,
      false,
    );
  };

  initManualForm() {
    this.setState({
      showManualForm: true,
    });
  }

  handlePress() {
    const { screenProps, hocs } = this.props;
    const { showManualForm, form } = this.state;
    const formKey = showManualForm ? 1 : 0;
    const formIsValid = hocs.formIsValid(formKey);
    if (formIsValid) {
      const body = {
        residentialAddressUnitNumber: hocs.form[1].unitNumber.value,
        residentialAddressStreetNumber: hocs.form[1].streetNumber.value,
        residenitalAddressStreet: hocs.form[1].streetName.value,
        residentialAddressStreetType: hocs.form[1].streetType.value,
        residentialAddressSuburb: hocs.form[1].suburb.value,
        resedentialAddressState: hocs.form[1].state.value,
        residentialAddressPostcode: hocs.form[1].postcode.value,
        residentialAddressCountry: 'Australia',
      };
      screenProps.Api.post(
        '/user',
        body,
        () => {
          screenProps.navigateTo(routeNames.PLACE_OF_BIRTH);
        },
        () => {
          screenProps.toastDanger('Error. Try again.');
        },
      );
    }
  }

  handleToggleAddManually() {
    const { showManualForm } = this.state;

    this.setState({
      showManualForm: !showManualForm,
    });
  }

  renderButtonNext() {
    const { showManualForm } = this.state;

    const button = (
      <Button onPress={() => this.handlePress()} block style={[sg.mT15]}>
        <Text>Next</Text>
      </Button>
    );

    if (!showManualForm) {
      return <KeyboardAvoidingView keyboardVerticalOffset={100}>{button}</KeyboardAvoidingView>;
    }

    return button;
  }

  renderButtonAddManually() {
    const { showManualForm } = this.state;

    const button = (
      <Button onPress={() => this.handleToggleAddManually()} bordered dark block marginVert>
        <Text>{showManualForm ? 'Search Address' : 'Add Address Manually'}</Text>
      </Button>
    );

    if (!showManualForm) {
      return <KeyboardAvoidingView keyboardVerticalOffset={100}>{button}</KeyboardAvoidingView>;
    }

    return button;
  }

  render() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;
    const { showManualForm, states, streetTypes } = this.state;
    return (
      <Content padder bounces={false} contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View style={sg.zIndex10}>
            <Text style={[sg.formHeading, sg.mB50]}>Home address</Text>

            {showManualForm ? (
              <View>
                {/* <Input
                    formData={form[1]}
                    dataKey={1}
                    helper="Address Line 1"
                    formKey="addressLineOne"
                    onChangeText={hocs.handleInput}
                  /> */}
                <Input
                  formData={form[1]}
                  dataKey={1}
                  helper="Unit Number"
                  formKey="unitNumber"
                  onChangeText={hocs.handleInput}
                />
                <Input
                  formData={form[1]}
                  dataKey={1}
                  helper="Street Number"
                  formKey="streetNumber"
                  onChangeText={hocs.handleInput}
                />
                <Input
                  formData={form[1]}
                  dataKey={1}
                  helper="Street Name"
                  formKey="streetName"
                  onChangeText={hocs.handleInput}
                />
                <Picker
                  formData={form[1]}
                  helper="Street Type"
                  formKey="streetType"
                  title={form[1].streetType.value ? form[1].streetType.value : 'Street Type'}
                  list={streetTypes}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={sg.pickerItemText}>{item.name}</Text>
                    </View>
                  )}
                  onPressItem={({ item }, formKey) => {
                    hocs.handlePicker(item.value, formKey, 1);
                    hocs.setFormTitle(item.name, formKey, 1);
                  }}
                />
                <Input
                  formData={form[1]}
                  dataKey={1}
                  helper="Suburb"
                  formKey="suburb"
                  onChangeText={hocs.handleInput}
                />
                <Picker
                  formData={form[1]}
                  helper="State"
                  formKey="state"
                  title={form[1].state.value ? form[1].state.value : 'Please Select a State'}
                  list={states}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={sg.pickerItemText}>{item.name}</Text>
                    </View>
                  )}
                  onPressItem={({ item }, formKey) => {
                    hocs.handlePicker(item.name, formKey, 1);
                    hocs.setFormTitle(item.name, formKey, 1);
                  }}
                />
                <Input
                  formData={form[1]}
                  dataKey={1}
                  helper="Postcode"
                  formKey="postcode"
                  onChangeText={hocs.handleInput}
                />
              </View>
            ) : (
              <Address
                onPressItem={this.onPressListItem}
                inputProps={{
                  formData: form && form[0] ? form[0] : null,
                  dataKey: 0,
                  formKey: 'address',
                  onChangeText: hocs.handleInput,
                }}
                Api={screenProps.Api}
              />
            )}
          </View>
          <View>
            {this.renderButtonNext()}
            {this.renderButtonAddManually()}
          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc(['FormHoc'])(HomeAddress);

export default connect()(res);
