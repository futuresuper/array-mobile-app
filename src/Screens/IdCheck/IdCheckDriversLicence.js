import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Content, Text, View, Button,
} from 'native-base';

import { Input, Picker } from 'src/Components/Form';
import { routeNames } from 'src/Navigation';

import { composeHoc, hocNames } from 'src/Common/Hocs';

import { sg } from 'src/Styles';
import { userSelector } from 'src/Redux/AppContent';
import { idCheckSave } from 'src/Redux/Auth';

class IdCheckDriversLicence extends Component {
  state = {
    form: {
      idType: { value: 'driversLicence' },
      driversLicenceState: { validations: ['required'] },
      driversLicenceNumber: { validations: ['required'] },
      driversLicenceFirstName: { validations: ['required'] },
      driversLicenceMiddleNames: {},
      driversLicenceLastName: { validations: ['required'] },
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
  }


  componentDidMount() {
    const { form } = this.state;
    this.initializeForm(form);
  }

  onSubmit() {
    const { hocs, idCheckSaveConnect, screenProps } = this.props;
    const isValid = hocs.formIsValid();

    if (isValid) {
      const driversLicenceState = hocs.form.driversLicenceState.value;
      const driversLicenceNumber = hocs.form.driversLicenceNumber.value;
      const driversLicenceFirstName = hocs.form.driversLicenceFirstName.value;
      const driversLicenceMiddleNames = hocs.form.driversLicenceMiddleNames.value;
      const driversLicenceLastName = hocs.form.driversLicenceLastName.value;

      screenProps.Api.post('/idcheck', {
        driversLicenceState,
        driversLicenceNumber,
        driversLicenceFirstName,
        driversLicenceMiddleNames,
        driversLicenceLastName,
        idType: "driversLicence"
      }, (res) => {
        console.log(res);
        idCheckSaveConnect(res);
        if (res.idCheckComplete) {
          screenProps.navigateTo(routeNames.ACCOUNTS);
          screenProps.toastSuccess('ID verification Succeeded');
        } else {
          screenProps.navigateTo(routeNames.ID_CHECK);
        }
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    }
  }

  initializeForm(form) {
    const { hocs, user } = this.props;
    hocs.setForm(form).then(() => {
      hocs.handleInput(user.firstName, 'driversLicenceFirstName');
      hocs.handleInput(user.lastName, 'driversLicenceLastName');
      hocs.handleInput(user.middleNames, 'driversLicenceMiddleNames');
    });
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { states } = this.state;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32]}>Drivers Licence</Text>

            <Input
              formData={form}
              formKey="driversLicenceNumber"
              helper="Licence Number"
              onChangeText={hocs.handleInput}
              color2
            />

            <Picker
              formData={form}
              helper="State Issued"
              formKey="driversLicenceState"
              //title={form.driversLicenceState.value ? form.driversLicenceState.value : 'Please Select a State'}
              list={states}
              renderItem={({ item }) => (
                <View>
                  <Text style={sg.pickerItemText}>{item.name}</Text>
                </View>
              )}
              onPressItem={({ item }, formKey) => {
                hocs.addOrUpdateFormField({ title: item.name, value: item.name }, formKey);
              }}
            />
            <Input
              formData={form}
              formKey="driversLicenceFirstName"
              helper="First name on license"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="driversLicenceMiddleNames"
              helper="Middle names on license"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="driversLicenceLastName"
              helper="Last name on license"
              onChangeText={hocs.handleInput}
              color2
            />


          </View>

          <Button block onPress={() => this.onSubmit()}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

IdCheckDriversLicence.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    middleNames: '',
  },
  idCheckSaveConnect: () => {},
};

IdCheckDriversLicence.propTypes = {
  user: PropTypes.object,
  idCheckSaveConnect: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const user = userSelector(state);
  return {
    item: ownProps.navigation.getParam('item'),
    newItemByType: ownProps.navigation.getParam('newItemByType'),
    user,
  };
};

const mapDispatchToProps = {
  idCheckSaveConnect: idCheckSave,
};

const res = composeHoc([hocNames.FORM])(IdCheckDriversLicence);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(res);
