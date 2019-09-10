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
    state = {
      form: {
        auto: {
          address: {
            validations: ['required'],
          },
        },
        manual: {
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
        },

      },
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

    componentDidMount() {
      this.setForm();
    }

    componentDidUpdate(prevProps, prevState) {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.showManualForm !== prevState.showManualForm) {
        this.setForm();
      }
    }

    setForm() {
      const { hocs } = this.props;
      const { form, showManualForm } = this.state;
      if (showManualForm) {
        hocs.setForm(form.manual);
      } else {
        hocs.setForm(form.auto);
      }
    }

  onPressListItem = (item) => {
    const { hocs } = this.props;
    const {
      RecordId, Postcode, Locality, State,
    } = item;
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

    _.forOwn(formValues, (v, k) => {
      hocs.addOrUpdateFormField(v, k);
    });

    this.initManualForm();
  };

  retrieveAddress = (recordId) => {
    const { form } = this.state;
    const { screenProps, hocs } = this.props;

    screenProps.Api.get(
      '/addressdetails',
      {
        paf: recordId,
      },
      (res) => {
        if (!res || !res.addressDetails) {
          return;
        }

        const {
          UnitNumber, StreetNumber1, StreetName, StreetType,
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
    const { showManualForm } = this.state;
    const formKey = showManualForm ? 1 : 0;
    const formIsValid = hocs.formIsValid(formKey);
    if (formIsValid) {
      const body = {
        // residentialAddressUnitNumber: hocs.form.unitNumber.value,
        residentialAddressUnitNumber: '12',
        // residentialAddressStreetNumber: hocs.form.streetNumber.value,
        residentialAddressStreetNumber: '35',
        // residenitalAddressStreet: hocs.form.streetName.value,
        residenitalAddressStreet: 'Example Street',
        
        // residentialAddressStreetType: hocs.form.streetType.value,
        // residentialAddressSuburb: hocs.form.suburb.value,
        // resedentialAddressState: hocs.form.state.value,
        // residentialAddressPostcode: hocs.form.postcode.value,
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
    this.setState(prevState => ({
      showManualForm: !prevState.showManualForm,
    }));
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
    console.log(form);
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
                  formData={form}
                  helper="Unit Number"
                  formKey="unitNumber"
                  onChangeText={hocs.handleInput}
                />
                <Input
                  formData={form}
                  helper="Street Number"
                  formKey="streetNumber"
                  onChangeText={hocs.handleInput}
                />
                <Input
                  formData={form}
                  helper="Street Name"
                  formKey="streetName"
                  onChangeText={hocs.handleInput}
                />
                <Picker
                  formData={form}
                  helper="Street Type"
                  formKey="streetType"
                  title={form.streetType.value ? form.streetType.value : 'Street Type'}
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
                  formData={form}
                  helper="Suburb"
                  formKey="suburb"
                  onChangeText={hocs.handleInput}
                />
                <Picker
                  formData={form}
                  helper="State"
                  formKey="state"
                  title={form.state.value ? form.state.value : 'Please Select a State'}
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
                  formData={form}
                  helper="Postcode"
                  formKey="postcode"
                  onChangeText={hocs.handleInput}
                />
              </View>
            ) : (
              <Input
                formData={form}
                helper="Address"
                formKey="address"
                onChangeText={hocs.handleInput}
              />
              // <Address
              //   onPressItem={this.onPressListItem}
              //   inputProps={{
              //     formData: form,
              //     formKey: 'address',
              //     onChangeText: hocs.handleInput,
              //   }}
              //   Api={screenProps.Api}
              // />
            )}
          </View>
          <View>
            {this.renderButtonNext()}
            {/* {this.renderButtonAddManually()} */}
          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc(['FormHoc'])(HomeAddress);

export default connect()(res);
