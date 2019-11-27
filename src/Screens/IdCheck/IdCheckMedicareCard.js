import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Content, Text, View, Button,
} from 'native-base';

import { Input } from 'src/Components/Form';
import { routeNames } from 'src/Navigation';

import { composeHoc, hocNames } from 'src/Common/Hocs';
import { formatShortDate, isShortDateValid } from 'src/Common/Helpers';


import { sg } from 'src/Styles';
import { userSelector } from 'src/Redux/AppContent';
import { idCheckSave } from 'src/Redux/Auth';

class IdCheckMedicareCard extends Component {
  state = {
    form: {
      idType: { value: 'medicareCard' },
      medicareCardNumber: { validations: ['required'] },
      medicareCardName: { validations: ['required'] },
      medicareCardIndividualReferenceNumber: { validations: ['required'] },
      medicareCardExpiryDate: { validations: ['required', isShortDateValid] },
      medicareCardColour: { validations: ['required'] },
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
      const medicareCardName = hocs.form.medicareCardName.value;
      const medicareCardNumber = hocs.form.medicareCardNumber.value;
      const medicareCardIndividualReferenceNumber = hocs.form.medicareCardIndividualReferenceNumber.value;
      const medicareCardExpiryDate = hocs.form.medicareCardExpiryDate.value;
      const medicareCardColour = hocs.form.medicareCardColour.value;

      screenProps.Api.post('/idcheck', {
        medicareCardName,
        medicareCardNumber,
        medicareCardIndividualReferenceNumber,
        medicareCardExpiryDate,
        medicareCardColour,
        idType: "medicareCard"
      }, (res) => {
        console.log(res);
        idCheckSaveConnect(res);
        if (res.idCheckComplete) {
          screenProps.navigateTo(routeNames.WHATS_NEXT);
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
    const { hocs } = this.props;
    hocs.setForm(form).then(() => {
      hocs.setFieldFormat('expiry', formatShortDate);
    });
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32]}>Medicare Card</Text>
            <Input
              formData={form}
              formKey="medicareCardName"
              helper="Name exactly as appears on card"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="medicareCardNumber"
              helper="Card Number"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="medicareCardIndividualReferenceNumber"
              helper="Individual Reference Number"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="medicareCardExpiryDate"
              helper="Expiry Date"
              onChangeText={hocs.handleInput}
              color2
            />
            <Input
              formData={form}
              formKey="medicareCardColour"
              helper="Color"
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

IdCheckMedicareCard.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    middleNames: '',
  },
  idCheckSaveConnect: () => {},
};

IdCheckMedicareCard.propTypes = {
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

const res = composeHoc([hocNames.FORM])(IdCheckMedicareCard);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(res);
