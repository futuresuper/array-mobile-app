import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Content, Button, Text } from 'native-base';

import { sg } from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import { Input } from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import { accountIdSelector, accountUpdateSave } from 'src/Redux/Account';

import { formatAmountDollar, normalizeAmount } from 'src/Common/Helpers';

import { routeNames } from 'src/Navigation';


class InitialInvestmentAmount extends React.Component {
    state = {
      form: {
        field: {
          validations: ['required'],
          normalize: normalizeAmount,
          format: formatAmountDollar,
        },
      },
    };


    componentDidMount() {
      const { hocs } = this.props;
      const { form } = this.state;

      hocs.setForm(form);
    }

    // eslint-disable-next-line class-methods-use-this
    validationRule(value) {
      if (value < 5 || value > 1000000) {
        return false;
      }

      return true;
    }

    handlePress() {
      const {
        screenProps, hocs, accountId, accountUpdateSaveConnect,
      } = this.props;
      const formIsValid = hocs.formIsValid({
        fieldError: true,
      });

      if (formIsValid) {
        const amount = hocs.form.field.value;
        if (!this.validationRule(amount)) {
          screenProps.toastDanger('Minimum investment amount is $5');
          return;
        }
        screenProps.Api.post(
          '/account',
          {
            accountId,
            initialInvestmentAmount: amount,
          },
          (res) => {
            accountUpdateSaveConnect(res);
            // screenProps.navigateTo(routeNames.ID_CHECK_ONLINE);

            if (amount > 5000) {
              screenProps.navigateTo(routeNames.ELECTRONIC_FUND_TRANSFER_INFO);
            } else {
              screenProps.navigateTo(routeNames.BANK_ACCOUNT);
            }
          },
          () => {
            screenProps.toastDanger('Error. Try Again');
          },
        );
      }
    }

    render() {
      const { hocs } = this.props;
      const { form } = hocs;

      return (
        <Content padder contentContainerStyle={sg.flexGrow}>
          <View style={[sg.spaceBetween]}>
            <View>
              <Text style={sg.formHeading}>Initial Investment</Text>

              <Text style={sg.formHeadingDescription}>
              How much would you like to get started with?
              </Text>

              <Input
                formData={form}
                formKey="field"
                helper="Amount"
                onChangeText={hocs.handleInput}
                keyboardType="numeric"
              />
            </View>

            <KeyboardAvoidingView keyboardVerticalOffset={100}>
              <Button onPress={() => this.handlePress()} block>
                <Text>Next</Text>
              </Button>
            </KeyboardAvoidingView>
          </View>
        </Content>
      );
    }
}

InitialInvestmentAmount.propTypes = {
  accountId: PropTypes.string.isRequired,
  accountUpdateSaveConnect: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  accountUpdateSaveConnect: accountUpdateSave,
};

const mapStateToProps = (state) => {
  const accountId = accountIdSelector(state);
  return {
    accountId,
  };
};

const res = composeHoc(['FormHoc'])(InitialInvestmentAmount);

export default connect(mapStateToProps, mapDispatchToProps)(res);
