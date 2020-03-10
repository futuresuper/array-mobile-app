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
import { userSelector, accountsSelector, appContentSave } from 'src/Redux/AppContent';
import { idCheckSave, userDataSave } from 'src/Redux/Auth';
import { accountSelectSave } from 'src/Redux/Account';
import amplitude from 'amplitude-js';

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

  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
    });
  }

  onSubmit() {
    const { hocs, screenProps, user, idCheckSaveConnect, userDataSaveConnect, appContentSaveConnect } = this.props;
    const isValid = hocs.formIsValid();
    if (isValid) {
      const driversLicenceState = hocs.form.driversLicenceState.value;
      const driversLicenceNumber = hocs.form.driversLicenceNumber.value;
      const driversLicenceFirstName = hocs.form.driversLicenceFirstName.value;
      const driversLicenceMiddleNames = hocs.form.driversLicenceMiddleNames.value;
      const driversLicenceLastName = hocs.form.driversLicenceLastName.value;

      // If user.personalDetailsLocked we know user has completed the application process
      // and are now trying to complete ID check.
      // Otherwise user must be in the application flow, in which case saving those ID check details
      // triggers GreenID check to happen in the background.
      if (user.personalDetailsLocked) {
          screenProps.Api.post('/idcheck', {
            driversLicenceState,
            driversLicenceNumber,
            driversLicenceFirstName,
            driversLicenceMiddleNames,
            driversLicenceLastName,
            idType: 'driversLicence',
          }, (res) => {
            idCheckSaveConnect(res);
            if (res.idCheckComplete) {
              this.getAppContent((appContent) => {
                const { user } = appContent;
                userDataSaveConnect(user);
                appContentSaveConnect(appContent);
                amplitude.getInstance().logEvent('Completed ID Check', {});
                screenProps.toastSuccess("ID verification Succeeded - you're all done!");
                screenProps.navigateTo(routeNames.ACCOUNTS);
              });
            } else {
              amplitude.getInstance().logEvent('ID Check Completion Attempt Failed', {});
              screenProps.navigateTo(routeNames.ID_CHECK);
            }
          }, () => {
            amplitude.getInstance().logEvent('ID Check Problem - Error Message Displayed', {});
            screenProps.toastDanger('Something went wrong. Please try again, or contact us: hello@arrayapp.co');
          });
      } else {
          screenProps.Api.post('/user', {
            driversLicenceState,
            driversLicenceNumber,
            driversLicenceFirstName,
            driversLicenceMiddleNames,
            driversLicenceLastName,
          }, () => {
            screenProps.navigateTo(routeNames.OCCUPATION);
          }, () => {
            screenProps.toastDanger('Error. Try Again');
          });
        }
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
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT40]}>
        <View style={sg.spaceBetween}>
          <View>
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
              // title={form.driversLicenceState.value ? form.driversLicenceState.value : 'Select a State'}
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
            {/*
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
            */}

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
  accounts: PropTypes.array.isRequired,
  userDataSaveConnect: PropTypes.func.isRequired,
  accountSelectSaveConnect: PropTypes.func.isRequired,
  appContentSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const user = userSelector(state);
  const accounts = accountsSelector(state);
  return {
    item: ownProps.navigation.getParam('item'),
    newItemByType: ownProps.navigation.getParam('newItemByType'),
    user,
    accounts,
  };
};

const mapDispatchToProps = {
  idCheckSaveConnect: idCheckSave,
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave,
  accountSelectSaveConnect: accountSelectSave,
};

const res = composeHoc([hocNames.FORM])(IdCheckDriversLicence);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(res);
