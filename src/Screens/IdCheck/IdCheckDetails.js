import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Content, Text, View, Button } from 'native-base';
import _ from 'lodash';

import { Input } from 'src/Components/Form';
import { routeNames } from 'src/Navigation';

import { composeHoc, hocNames } from 'src/Common/Hocs';

import idCheckUtils from 'src/Common/idCheck';
import { normalizeAmount, formatShortDate, isShortDateValid } from 'src/Common/Helpers';

import { sg } from 'src/Styles';
import { userSelector } from 'src/Redux/AppContent';
import { idCheckSave } from 'src/Redux/Auth';

class IdCheckDetails extends Component {
  componentDidMount() {
    const { item, newItemByType } = this.props;

    if (newItemByType) {
      this.setForm(this.getEmptyForm());
    } else {
      this.setForm(item);
    }
  }

  onSubmit() {
    const { hocs, screenProps, idCheckSaveConnect } = this.props;
    const formIsValid = hocs.formIsValid();
    //dummy data need to be refactored
    const dummyRes = this.setDummyRes(hocs.form);

    if (formIsValid) {
      const body = this.setReqBody(hocs.form);
      screenProps.Api.post(
        '/idcheck',
        body,
        res => {
          if (res.idCheckComplete) {
            screenProps.navigateTo(routeNames.HOME_ADDRESS);
          } else {
            idCheckSaveConnect(res);
            screenProps.navigateTo(routeNames.ID_CHECK);
            // // screenProps.navigateTo(routeNames.ID_CHECK_FINISH);
          }
        },
        () => {
          // screenProps.toastDanger('Error. Try Again');
          idCheckSaveConnect(dummyRes);
          screenProps.navigateTo(routeNames.ID_CHECK);
        },
      );
    }
    return null;
  }

  // needs to be deleted
  setDummyRes(form) {
    if (form.type.value === 'Passport') {
      return {
        idCheckComplete: false,
        driversLicence: 'matchFailed',
        australianPassport: 'matched',
        medicareCard: 'notAttempted',
      };
    } else if (form.type.value === 'DriversLicence') {
      return {
        idCheckComplete: false,
        driversLicence: 'matchFailed',
        australianPassport: 'notAttempted',
        medicareCard: 'notAttempted',
      };
    } else {
      return {
        idCheckComplete: false,
        driversLicence: 'matchFailed',
        australianPassport: 'matched',
        medicareCard: 'matchFailed',
      };
    }
  }

  setReqBody(form) {
    if (form.type.value === 'Passport') {
      return {
        idType: 'passport',
        passportNumber: form.passportNumber.value,
        passportFirstName: form.firstName.value,
        passportMiddleNames: form.middleNames.value,
        passportLastName: form.lastName.value,
      };
    } else if (form.type.value === 'DriversLicence') {
      return {
        idType: 'driversLicence',
        driversLicenceState: form.state.value,
        driversLicenceNumber: form.licenceNumber.value,
        driversLicenceFirstName: form.firstName.value,
        driversLicenceMiddleNames: form.middleNames.value,
        driversLicenceLastName: form.lastName.value,
      };
    } else {
      return {
        idType: 'medicareCard',
        medicareCardNumber: form.cardNumber.value,
        medicareCardName: form.cardName.value,
        medicareCardIndividualReferenceNumber: form.referenceNumber.value,
        medicareCardExpiryDate: form.expiry.value,
        medicareCardColour: form.colour.value,
      };
    }
  }

  getEmptyForm() {
    const { newItemByType, user } = this.props;

    let res = {
      type: newItemByType,
    };
    if (newItemByType === idCheckUtils.ID_TYPE.PASSPORT) {
      res = {
        ...res,
        passportNumber: '',
        firstName: user.firstName || '',
        middleNames: '',
        lastName: user.lastName || '',
      };
    } else if (newItemByType === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
      res = {
        ...res,
        licenceNumber: '',
        state: '',
        firstName: user.firstName || '',
        middleNames: '',
        lastName: user.lastName || '',
      };
    } else if (newItemByType === idCheckUtils.ID_TYPE.MEDICARE_CARD) {
      res = {
        ...res,
        cardName: user.fullName || '',
        cardNumber: '',
        referenceNumber: '',
        expiry: '',
        colour: 'Green',
      };
    }
    return res;
  }

  setForm(item) {
    const { hocs } = this.props;
    hocs.setFormFromObject(item).then(() => {
      hocs.setFieldValidations('firstName', ['required']);
      hocs.setFieldValidations('lastName', ['required']);

      if (item.type === idCheckUtils.ID_TYPE.PASSPORT) {
        hocs.setFieldValidations('passportNumber', ['required']);
        hocs.setFieldValidations('expiry', ['required', [isShortDateValid, 'Wrong date']]);

        hocs.setFieldFormat('expiry', formatShortDate);
        hocs.setFieldNormalize('expiry', normalizeAmount);

        hocs.setFieldValidations('country', ['required']);
      } else if (item.type === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
        hocs.setFieldValidations('licenceNumber', ['required']);

        hocs.setFieldValidations('state', ['required']);
      } else if (item.type === idCheckUtils.ID_TYPE.MEDICARE_CARD) {
        hocs.setFieldValidations('cardNumber', ['required']);
      }
    });
  }

  getTitle() {
    const { newItemByType } = this.props;
    let res = 'Update ID Details';

    if (newItemByType) {
      res = `${idCheckUtils.getTypeName(newItemByType)}`;
    }

    return res;
  }

  renderFormInput(key, index, form) {
    const { hocs, newItemByType } = this.props;
    let helper = '';

    if (['type', 'verified'].includes(key)) {
      return null;
    }

    switch (key) {
      case 'firstName':
        if (newItemByType === idCheckUtils.ID_TYPE.PASSPORT) {
          helper = 'First name on passport';
        } else if (newItemByType === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
          helper = 'First name on license';
        } else {
          helper = 'First name on Medicare Card';
        }
        break;
      case 'lastName':
        if (newItemByType === idCheckUtils.ID_TYPE.PASSPORT) {
          helper = 'Last name on passport';
        } else if (newItemByType === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
          helper = 'Last name on license';
        } else {
          helper = 'Last name on Medicare Card';
        }
        break;
      case 'middleNames':
        if (newItemByType === idCheckUtils.ID_TYPE.PASSPORT) {
          helper = 'Middle names on passport';
        } else if (newItemByType === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
          helper = 'Middle names on license';
        } else {
          helper = 'Middle names on Medicare Card';
        }
        break;
      case 'passportNumber':
        helper = 'Passport Number';
        break;
      case 'licenceNumber':
        helper = 'Licence number';

        break;
      case 'cardNumber':
        helper = 'Medicare Card Number';

        break;
      case 'referenceNumber':
        helper = 'Individual Reference Number';

        break;
      case 'state':
        helper = 'State issued';

        break;
      case 'country':
        helper = 'Country';

        break;
      case 'expiry':
        helper = 'Card Expiry Date';
        break;
      case 'colour':
        helper = 'Card Colour';
        break;
      case 'cardName':
        helper = 'Name exactly as appears on card';
        break;
      default:
        break;
    }

    return (
      <Input
        key={index.toString()}
        formData={form}
        formKey={key}
        helper={helper}
        onChangeText={hocs.handleInput}
        color2
      />
    );
  }

  renderForm() {
    const { hocs } = this.props;
    const { form } = hocs;

    if (!form) {
      return null;
    }

    // const hz =

    console.log('!!!', { form });

    return (
      <View>
        {Object.keys(form).map((key, index) => this.renderFormInput(key, index, form))}
        {/* <Input
          formData={form}
          formKey="name"
          helper="Full name on licence"
          onChangeText={hocs.handleInput}
          color2
        />

        <Input
          formData={form}
          formKey="no"
          helper="Licence number"
          onChangeText={hocs.handleInput}
          color2
        />

        <Input
          formData={form}
          formKey="state"
          helper="State"
          onChangeText={hocs.handleInput}
          color2
        /> */}
      </View>
    );
  }

  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32]}>{this.getTitle()}</Text>

            {this.renderForm()}
          </View>

          <Button block onPress={() => this.onSubmit()}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

IdCheckDetails.defaultProps = {
  item: null,
  newItemByType: null,
  idCheckSaveConnect: () => {},
};

IdCheckDetails.propTypes = {
  item: PropTypes.object,
  newItemByType: PropTypes.string,
  user: PropTypes.object.isRequired,
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

const res = composeHoc([hocNames.FORM])(IdCheckDetails);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(res);
