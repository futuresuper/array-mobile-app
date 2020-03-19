import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Content, Text, View, Button } from 'native-base';
import { Input } from 'src/Components/Form';
import { routeNames } from 'src/Navigation';
import { composeHoc, hocNames } from 'src/Common/Hocs';
import { sg } from 'src/Styles';
import { userSelector, accountsSelector, appContentSave } from 'src/Redux/AppContent';
import { idCheckSave, userDataSave, applicationIdSelector } from 'src/Redux/Auth';
import { accountSelectSave } from 'src/Redux/Account';

class IdCheckAustralianPassport extends Component {
  state = {
    form: {
      idType: { value: 'australianPassport' },
      passportNumber: { validations: ['required'] },
      passportFirstName: { validations: ['required'] },
      passportMiddleNames: {},
      passportLastName: { validations: ['required'] },
    },
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
    const { hocs, idCheckSaveConnect, userDataSaveConnect, appContentSaveConnect, screenProps, accounts } = this.props;
    const { account } = screenProps;
    const isValid = hocs.formIsValid();

    if (isValid) {
      const passportFirstName = hocs.form.passportFirstName.value;
      const passportMiddleNames = hocs.form.passportMiddleNames.value;
      const passportLastName = hocs.form.passportLastName.value;
      const passportNumber = hocs.form.passportNumber.value;

      screenProps.Api.post('/idcheck', {
        passportFirstName,
        passportMiddleNames,
        passportLastName,
        passportNumber,
        idType: 'australianPassport',
      }, (res) => {
        idCheckSaveConnect(res);
        if (res.idCheckComplete) {
          this.getAppContent((appContent) => {
            const { user } = appContent;
            userDataSaveConnect(user);
            appContentSaveConnect(appContent);
            screenProps.toastSuccess("ID verification Succeeded - you're all done!");
            screenProps.navigateTo(routeNames.ACCOUNTS);
          });
        } else {
          screenProps.navigateTo(routeNames.ID_CHECK);
        }
      }, () => {
        screenProps.toastDanger('Something went wrong. Please try again, or contact us: hello@arrayapp.co');
      });
    }
  }

  onSubmit() {
    const { hocs, screenProps, user, idCheckSaveConnect, userDataSaveConnect, appContentSaveConnect } = this.props;
    const isValid = hocs.formIsValid();
    if (isValid) {
      const passportFirstName = hocs.form.passportFirstName.value;
      const passportMiddleNames = hocs.form.passportMiddleNames.value;
      const passportLastName = hocs.form.passportLastName.value;
      const passportNumber = hocs.form.passportNumber.value;

      // If user.personalDetailsLocked we know user has completed the application process
      // and are now trying to complete ID check.
      // Otherwise user must be in the application flow, in which case saving those ID check details
      // triggers GreenID check to happen in the background.
      if (user.personalDetailsLocked) {
          screenProps.Api.post('/idcheck', {
            passportFirstName,
            passportMiddleNames,
            passportLastName,
            passportNumber,
            idType: 'australianPassport',
          }, (res) => {
            idCheckSaveConnect(res);
            if (res.idCheckComplete) {
              this.getAppContent((appContent) => {
                const { user } = appContent;
                userDataSaveConnect(user);
                appContentSaveConnect(appContent);
                amplitude.getInstance().logEvent('Completed ID Check', {});
                screenProps.toastSuccess("ID verification Succeeded - you're all done!");
                screenProps.navigateTo(routeNames.WHATS_NEXT);
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
            passportFirstName,
            passportMiddleNames,
            passportLastName,
            passportNumber,
          }, () => {
            screenProps.navigateTo(routeNames.OCCUPATION);
          }, () => {
            screenProps.toastDanger('Error. Try Again');
          });
        }
    }
  }

  goToAccountHome() {
    const { accountSelectSaveConnect, accounts } = this.props;
    accountSelectSaveConnect(accounts[0]);
  }

  initializeForm(form) {
    const { hocs, user } = this.props;
    hocs.setForm(form).then(() => {
      hocs.handleInput(user.firstName, 'passportFirstName');
      hocs.handleInput(user.lastName, 'passportLastName');
      hocs.handleInput(user.middleNames, 'passportMiddleNames');
    });
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT40]}>
        <View style={sg.spaceBetween}>
          <View>
          {/*
            <Input
              formData={form}
              formKey="passportFirstName"
              helper="First name on passport"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="passportMiddleNames"
              helper="Middle names on passport"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="passportLastName"
              helper="Last name on passport"
              onChangeText={hocs.handleInput}
              color2
            />
            */}
            <Input
              formData={form}
              formKey="passportNumber"
              helper="Australian Passport Number"
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

IdCheckAustralianPassport.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    middleNames: '',
  },
  idCheckSaveConnect: () => {},
};

IdCheckAustralianPassport.propTypes = {
  user: PropTypes.object,
  idCheckSaveConnect: PropTypes.func,
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

const res = composeHoc([hocNames.FORM])(IdCheckAustralianPassport);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(res);
