import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Content, Text, View, Button,
} from 'native-base';

import { Input } from 'src/Components/Form';
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
          screenProps.navigateTo(routeNames.TAB_HOME);
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

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32]}>Drivers Licence</Text>
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
            <Input
              formData={form}
              formKey="driversLicenceNumber"
              helper="Licence Number"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="driversLicenceState"
              helper="State Issued"
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
