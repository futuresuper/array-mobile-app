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
import { userSelector, accountsSelector } from 'src/Redux/AppContent';
import { idCheckSave } from 'src/Redux/Auth';

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


  onSubmit() {
    const { hocs, idCheckSaveConnect, screenProps } = this.props;
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
        console.log(res);
        idCheckSaveConnect(res);
        if (res.idCheckComplete) {
          console.log("accounts length: " + accounts.length);
          if (accounts.length === 1) {
            screenProps.navigateTo(routeNames.TAB_HOME, {
              accountId: accounts[0].id,
            });
          } else {
            screenProps.navigateTo(routeNames.ACCOUNTS);
          };
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
      hocs.handleInput(user.firstName, 'passportFirstName');
      hocs.handleInput(user.lastName, 'passportLastName');
      hocs.handleInput(user.middleNames, 'passportMiddleNames');
    });
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32]}>Australian Passport</Text>
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
            <Input
              formData={form}
              formKey="passportNumber"
              helper="Passport number"
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
};

const res = composeHoc([hocNames.FORM])(IdCheckAustralianPassport);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(res);
