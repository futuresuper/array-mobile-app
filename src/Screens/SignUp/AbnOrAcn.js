
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
import TextLink from 'src/Components/TextLink';

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
      searchMode: true,
      abnAcnInfo: null,
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  // eslint-disable-next-line class-methods-use-this
  onNext() {
    const { screenProps } = this.props;
    screenProps.Api.post('entities', {
      type: 'Company',
      Entity_name: 'hz',
    }, (res) => {
      console.log('!!!', { res });
    });
  }

  showNext(data) {
    this.setState({
      searchMode: false,
      abnAcnInfo: data,
    });
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

  alert(text) {
    const { screenProps } = this.props;
    const contactUs = <TextLink url="https://www.futurerenewablesfund.com.au/contact">contact us</TextLink>;

    screenProps.alert({
      title: 'Alert',
      body:
      (
        <Text>
          {text}
          {contactUs}
        </Text>
      ),
    });
  }

  handlePress() {
    const { searchMode } = this.state;

    if (searchMode) {
      this.searchAnbAcn();
    } else {
      this.onNext();
    }
  }

  searchAnbAcn() {
    const { hocs, screenProps } = this.props;
    const formIsValid = hocs.formIsValid({
      fieldError: true,
    });
    const formValue = hocs.form.field.value;
    const formValueLength = hocs.form.field.value.length;

    if (!formIsValid) return;

    const onSuccess = (res) => {
      screenProps.spinnerHide();
      const data = res.Result[0];
      const status = data.EntityStatusCode;

      data.ApplicationType = '';
      data.isCompany = false;
      data.isSoleTrader = false;
      data.isPartnership = false;

      if (status !== 'Active') {
        this.alert('Sorry, it looks like that ABN or ACN is not active. If this doesn’t seem right, please ');
      } else {
        switch (data.EntityTypeCode) {
          case 'PRV': {
            data.ApplicationType = 'Company';
            data.isCompany = true;
            this.showNext(data);
            break;
          }
          case 'IND': {
            data.ApplicationType = 'Sole Trader';
            data.isSoleTrader = true;
            this.showNext(data);
            break;
          }
          case 'TraderPTR': {
            data.ApplicationType = 'Partnership';
            data.isPartnership = true;
            this.showNext(data);
            break;
          }
          default: {
            this.alert('Sorry, we don’t accept online applications for that entity type. Please ');
          }
        }
      }
    };

    const onError = () => {
      screenProps.spinnerHide();
      this.alert('Sorry, we weren’t able to validate that ABN or ACN. If this doesn’t seem right, please ');
    };

    if (formValueLength === 11) {
      screenProps.spinnerShow();
      KleberAPI.requestVerifyAbn(formValue, onSuccess, onError);
    } if (formValueLength === 9) {
      screenProps.spinnerShow();
      KleberAPI.requestVerifyAcn(formValue, onSuccess, onError);
    }
  }

  render() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;
    const { searchMode, abnAcnInfo } = this.state;

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

          {abnAcnInfo
            && (
              <View style={styleGlobal.center}>
                <Text style={styleGlobal.mT10}>Business Name:</Text>
                <Text style={styleGlobal.textBold}>{abnAcnInfo.BusinessNameOrganisationName}</Text>
                <Text style={styleGlobal.mT10}>Business Type:</Text>
                <Text style={styleGlobal.textBold}>{abnAcnInfo.ApplicationType}</Text>
              </View>
            )
          }

        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>{ searchMode ? 'Search' : 'Next' }</Text>
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
