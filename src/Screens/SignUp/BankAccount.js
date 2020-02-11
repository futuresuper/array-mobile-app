
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  View,
  Linking,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Grid,
  Col,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import {
  accountIdSelector, accountUpdateSave,
} from 'src/Redux/Account';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
  CheckBox,
} from 'src/Components/Form';

import {
  routeNames,
} from 'src/Navigation';

import {
  formatBSB,
  normalizeBSB,
  validatorBSB,
} from 'src/Common/Helpers';

class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        accountName: {
          // validations: [[this.accountNameValidator, 'Bank account must be in your own name']],
        },
        bsb: {
          validations: [[validatorBSB, 'Please enter a valid BSB']],
          normalize: normalizeBSB,
          format: formatBSB,
        },
        accountNumber: {
          validations: ['required'],
        },
        authority: {
          validations: ['required'],
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  accountNameValidator(valueInp) {
    if (!valueInp) {
      return true;
    }

    const value = _.trim(valueInp);

    if ([
      'commbank',
      'savings',
    ].find((item) => value.toLowerCase().includes(item))) {
      return true;
    }

    const valueArr = value.split(' ');
    const valueArrLength = valueArr.length;

    if (valueArrLength < 2) {
      return true;
    }

    const valueFirstLength = valueArr[0].length;
    const valueFirstSecond = valueArr[1].length;

    if (
      (
        (valueFirstLength === 1)
        && (valueFirstSecond === 1)
      )
      || (
        (valueFirstLength > 1)
        && (valueFirstSecond === 1)
      )
    ) {
      return true;
    }

    return false;
  }

  handlePress() {
    const {
      screenProps, hocs, accountId, accountUpdateSaveConnect,
    } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.Api.get('/bsbdetails', { bsb: `${hocs.form.bsb.value}` }, () => {
        const body = {
          accountId,
          bankAccountName: hocs.form.accountName.value,
          bankAccountBsb: `${hocs.form.bsb.value}`,
          bankAccountNumber: `${hocs.form.accountNumber.value}`,
        };
        screenProps.Api.post('/account', body, (res) => {
          accountUpdateSaveConnect(res);
          screenProps.navigateTo(routeNames.ID_CHECK_ONLINE);
          /*
          screenProps.toast('All done!', {
            iconType: 'MaterialCommunityIcons',
            iconName: 'check-circle',
          });
          screenProps.navigateTo(routeNames.TAB_HOME);
          */
        }, () => {
          screenProps.toastDanger('Error. Try Again');
        });
      }, () => {
        screenProps.toastDanger('Wrong BSB');
      });
    }
  }

  clickOnLink() {
    Linking.openURL('https://static.ezidebit.com.au/ServiceAgreement/AU/DDR_Service_Agreement.html');
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View style={sg.mB20}>
            <Input
              formData={form}
              formKey="bsb"
              helper="BSB"
              onChangeText={hocs.handleInput}
              keyboardType="numeric"
            />

            <Input
              formData={form}
              formKey="accountNumber"
              helper="Account number"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="accountName"
              helper="Bank account name"
              onChangeText={hocs.handleInput}
            />

            <Grid style={sg.mT20}>
              <Col style={sg.width50}>
                <CheckBox
                  formData={form}
                  formKey="authority"
                  onPress={hocs.handleCheckBox}
                />
              </Col>
              <Col>
                <Text style={[sg.textBold, sg.fS10]}>Provide authority to direct debit your bank account</Text>
                <Text style={[sg.fS10, sg.mT10]}>
                  I authorise Ezidebit Pty Ltd ACN 096 902 813 (User ID No 165969, 303909, 301203, 234040, 234072, 428198)
                  to debit my account at the Financial Institution identified above through the Bulk Electronic Clearing System (BECS),
                  in accordance with this Direct Debit Request and as per the&nbsp;
                  <Text onPress={() => this.clickOnLink()} style={[sg.fS10, sg.textUnderline]}>Ezidebit DDR Service Agreement</Text>
                  .
                  I authorise these payments to be debited at intervals and amounts as directed by Future Super for the Future Renewables Fund,
                  as per the Terms and Conditions of the Future Super agreement and subsequent agreements.
                </Text>
              </Col>
            </Grid>

          </View>

          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

BankAccount.propTypes = {
  accountId: PropTypes.string.isRequired,
  accountUpdateSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const accountId = accountIdSelector(state);

  return {
    accountId,
  };
};

const mapDispatchToProps = {
  accountUpdateSaveConnect: accountUpdateSave,
};


const res = composeHoc([
  'FormHoc',
])(BankAccount);


export default connect(mapStateToProps, mapDispatchToProps)(res);
