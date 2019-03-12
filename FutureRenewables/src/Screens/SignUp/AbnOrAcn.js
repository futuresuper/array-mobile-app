
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import KleberAPI from 'src/Common/Kleber';
import {
  Input,
} from 'src/Components/Form';

import ListLinks from 'src/Components/ListLinks';
import constants from './constants';

class AbnOrAcn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        field: {
          validations: [
            'required',
            [this.validRule, 'Please Enter a valid ABN or ACN'],
          ],
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  // eslint-disable-next-line class-methods-use-this
  validRule(value) {
    const valueLength = value.length;
    const isNum = /^\d*$/.test(value);

    if (
      isNum
      && (
        (valueLength === 9)
        || (valueLength === 11)
      )
    ) {
      return true;
    }

    return false;
  }

  handlePress() {
    const { hocs, screenProps } = this.props;
    const formIsValid = hocs.formIsValid({
      fieldError: true,
    });
    const formValue = hocs.form.field.value;

    if (!formIsValid) return;

    KleberAPI.requestVerifyAbn(formValue, (res) => {
      const data = res.Result[0];
      const status = data.EntityStatusCode;

      if (status !== 'Active') {

        //screenProps.toast('Sorry, it looks like that ABN or ACN is not active. If this doesn’t seem right, please ​contact us.');
      } else {
      }
    }, () => {
      screenProps.toast('Sorry, we weren’t able to validate that ABN or ACN. If this doesn’t seem right, please ​contact us');
    });
  }

  render() {
    const { screenProps } = this.props;
    const { hocs } = this.props;
    const { form } = hocs;


    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          ABN or ACN
          </Text>

          <Input
            formData={form}
            formKey="field"
            placeholder="ABN or ACN"
            onChangeText={hocs.handleInput}
            keyboardType="numeric"
            itemProps={{
              marginBottom: true,
            }}
          />
        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Search</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>

        <ListLinks
          absolute
          navigateTo={screenProps.navigateTo}
          data={[
            {
              name: 'Sole Trader',
              screen: 'SoleTraderConfirmation',
            },
            {
              name: 'Company',
              screen: 'EntityContactDetails',
              params: { type: constants.COMPANY },
            },
            {
              name: 'Partnership',
              screen: 'EntityContactDetails',
              params: { type: constants.PARTNERSHIP },
            },
          ]}
        />
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(AbnOrAcn);

export default connect()(res);
