
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Content,
  Text,
  View,
  Button,
} from 'native-base';
import _ from 'lodash';

import {
  Input,
} from 'src/Components/Form';
import {
  routeNames,
} from 'src/Navigation';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import idCheckUtils from 'src/Common/idCheck';
import {
  normalizeAmount,
  formatShortDate,
  isShortDateValid,
} from 'src/Common/Helpers';

import {
  sg,
} from 'src/Styles';

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
    const { hocs, screenProps } = this.props;
    const formIsValid = hocs.formIsValid();

    if (!formIsValid) {
      return;
    }

    screenProps.navigateTo(routeNames.ID_CHECK_FINISH);
  }

  getEmptyForm() {
    const { newItemByType } = this.props;

    let res = {
      type: newItemByType,
      name: '',
    };

    if (newItemByType === idCheckUtils.ID_TYPE.PASSPORT) {
      res = {
        ...res,
        passportNumber: '',
        expiry: '',
        country: '',
      };
    } else if (newItemByType === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
      res = {
        ...res,
        licenseNumber: '',
        state: '',
      };
    } else if (newItemByType === idCheckUtils.ID_TYPE.MEDICARE_CARD) {
      res = {
        ...res,
        cardNumber: '',
        referenceNumber: '',
        expiry: '',
      };
    }

    return res;
  }

  setForm(item) {
    const { hocs } = this.props;

    hocs.setFormFromObject(item).then(() => {
      hocs.setFieldValidations('name', [
        'required',
      ]);

      if (item.type === idCheckUtils.ID_TYPE.PASSPORT) {
        hocs.setFieldValidations('passportNumber', [
          'required',
        ]);
        hocs.setFieldValidations('expiry', [
          'required',
          [isShortDateValid, 'Wrong date'],
        ]);

        hocs.setFieldFormat('expiry', formatShortDate);
        hocs.setFieldNormalize('expiry', normalizeAmount);

        hocs.setFieldValidations('country', [
          'required',
        ]);
      } else if (item.type === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
        hocs.setFieldValidations('licenseNumber', [
          'required',
        ]);

        hocs.setFieldValidations('state', [
          'required',
        ]);
      } else if (item.type === idCheckUtils.ID_TYPE.MEDICARE_CARD) {
        hocs.setFieldValidations('passportNucardNumbermber', [
          'required',
        ]);
      }
    });
  }

  getTitle() {
    const { newItemByType } = this.props;
    let res = 'Update ID Details';

    if (newItemByType) {
      res = `${idCheckUtils.getTypeName(newItemByType)} details`;
    }

    return res;
  }

  renderFormInput(key, index, form) {
    const { hocs, newItemByType } = this.props;
    let helper = '';

    if ([
      'type',
      'verified',
    ].includes(key)) {
      return null;
    }

    switch (key) {
      case 'name':
        if (newItemByType === idCheckUtils.ID_TYPE.PASSPORT) {
          helper = 'Full name on passport';
        } else if (newItemByType === idCheckUtils.ID_TYPE.DRIVERS_LICENSE) {
          helper = 'Full name on license';
        } else {
          helper = 'Full name on Medicare Card';
        }

        break;
      case 'passportNumber':
        helper = 'Pasport number';

        break;
      case 'licenseNumber':
        helper = 'License number';

        break;
      case 'cardNumber':
        helper = 'Card Number';

        break;
      case 'referenceNumber':
        helper = 'Reference number';

        break;
      case 'state':
        helper = 'State';

        break;
      case 'country':
        helper = 'Country';

        break;
      case 'expiry':
        helper = 'Expiry';

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
            <Text style={[sg.formHeading32]}>
              {this.getTitle()}
            </Text>

            {this.renderForm()}
          </View>

          <Button
            block
            onPress={() => this.onSubmit()}
          >
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
};

IdCheckDetails.propTypes = {
  item: PropTypes.object,
  newItemByType: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.navigation.getParam('item'),
  newItemByType: ownProps.navigation.getParam('newItemByType'),
});

const res = composeHoc([
  hocNames.FORM,
])(IdCheckDetails);

export default connect(mapStateToProps)(res);
