
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Button,
  Content,
  Text,
} from 'native-base';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  formatAmountDollar,
  normalizeAmount,
} from 'src/Common/Helpers';

import {
  Input,
  Switch,
} from 'src/Components/Form';
import Br from 'src/Components/Br';
import PickerIngAccount from 'src/Components/PickerIngAccount';
import EditButton from 'src/Components/EditButton';

import {
  sg,
  sc,
} from 'src/Styles';

import styles from './styles';

class ManageAccountDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: navigation.state.params.headerRight,
  });

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      details: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const details = navigation.getParam('details');

    navigation.setParams({
      title: details.accountNickName,
    });

    this.setState({
      details,
    }, () => {
      this.setForm();
      this.displayHeaderRight();
    });
  }

  onSave() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { details } = this.state;

    const formIsValid = hocs.formIsValid();

    if (!formIsValid) {
      return;
    }

    Object.keys(form).forEach((key) => {
      const item = form[key];

      details[key] = item.value;
    });

    this.setState({
      details,
    });

    this.readMode();
  }

  setForm() {
    const { hocs } = this.props;
    const { details } = this.state;

    details.distributions = true;
    details.regularInvestmentAmmount = (details.monthlyInvestmentAmount || '').toString();
    details.admins = '';

    const form = {};
    Object.keys(details).forEach((key) => {
      const value = details[key];
      form[key] = {
        value,
      };

      if (![
        'distributions',
        'balance',
        'complete',
        'admins',
      ].includes(key)) {
        form[key].validations = [
          'required',
        ];
      }

      if (key === 'regularInvestmentAmmount') {
        form[key].normalize = normalizeAmount;
        form[key].format = formatAmountDollar;
      }
    });

    hocs.setForm(form);
  }

  editMode() {
    const { navigation } = this.props;

    this.setState({
      isEdit: true,
    });

    navigation.setParams({
      headerRight: undefined,
    });

    this.setForm();
  }

  displayHeaderRight() {
    const { navigation } = this.props;
    const { details, isEdit } = this.state;

    if (
      // !details.complete ||
      isEdit
    ) {
      return;
    }

    navigation.setParams({
      headerRight: this.renderHeaderRight(),
    });
  }

  readMode() {
    this.setState({
      isEdit: false,
    }, () => {
      this.displayHeaderRight();
    });
  }

  renderHeaderRight() {
    return (
      <EditButton
        onPress={() => {
          this.editMode();
        }}
      />
    );
  }

  renderReadForm() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { details } = this.state;
    let regularInvestmentAmmount = '-';

    if (!form) {
      return null;
    }

    if (details.regularInvestmentAmmount) {
      regularInvestmentAmmount = `$${details.regularInvestmentAmmount} / month`;
    }

    return (
      <View>
        <Input
          disabled
          label="Nickname"
          labelGray
          value={details.accountNickName || '-'}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Linked Bank Account"
          labelGray
          value={details.bankAccountName || '-'}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Distributions"
          labelGray
          value={details.distributions ? 'Reinvested' : '-'}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Regular investment ammount"
          labelGray
          value={regularInvestmentAmmount}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        {details.complete && (
          <Input
            disabled
            label="Authorised admins"
            labelGray
            value={details.admins}
            style={styles.input}
            containerStyle={styles.inputContainer}
          />
        )}
      </View>
    );
  }

  renderEditFormButtons() {
    return (
      <View>
        <Button
          block
          style={[sg.mT40, sg.mB10]}
          onPress={() => {
            this.onSave();
          }}
        >
          <Text>Save</Text>
        </Button>

        <Button
          transparent
          block
          onPress={() => {
            this.readMode();
          }}
          style={sg.mB20}
        >
          <Text>Cancel</Text>
        </Button>

      </View>
    );
  }

  renderEditForm() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <View style={sg.spaceBetween}>
        <View>
          <Input
            formData={form}
            formKey="accountNickName"
            label="Nickname"
            labelGray
            onChangeText={hocs.handleInput}
            style={styles.input}
            containerStyle={styles.inputContainer}
            inputLineColor={sc.color.gray1}
          />

          <PickerIngAccount
            formData={form}
            formKey="bankAccountName"
            label="Linked Bank Account"
            labelGray
            title={form.bankAccountName.value}
            titleStyle={styles.input}
            containerStyle={styles.inputContainer}
            onPressItem={({ item }, formKey, dataKey) => {
              hocs.handlePicker(item.number, formKey, dataKey);
              hocs.setFormTitle(item.number, formKey, dataKey);
            }}
            lineColor={sc.color.gray1}
          />

          <Switch
            formData={form}
            formKey="distributions"
            label="Distributions"
            labelGray
            title="Reinvested"
            titleStyle={styles.input}
            onPress={hocs.handleCheckBox}
            lineColor={sc.color.gray1}
          />

          <Input
            formData={form}
            formKey="regularInvestmentAmmount"
            label="Regular investment ammount"
            labelGray
            onChangeText={hocs.handleInput}
            keyboardType="numeric"
            style={styles.input}
            containerStyle={styles.inputContainer}
            inputLineColor={sc.color.gray1}
          />

          <Input
            // disabled
            label="Authorised admins"
            labelGray
            value={form.admins.value}
            style={styles.input}
            containerStyle={styles.inputContainer}
            inputLineColor={sc.color.gray1}
          />
        </View>

        {this.renderEditFormButtons()}
      </View>
    );
  }

  renderIncApp() {
    return (
      <View style={[sg.incAppBl, sg.aSCenter]}>
        <Text style={[sg.incAppText]}>Incomplete application</Text>
      </View>
    );
  }

  render() {
    const { details, isEdit } = this.state;
    const { complete } = details;

    return (
      <Content contentContainerStyle={[sg.pT0, sg.flexGrow]} bounces={false}>
        {complete
          ? (
            <Text style={[sg.aSCenter, sg.fS14, sg.fontMedium, sg.colorGray11]}>
              $
              {details.balanceDollars}
            </Text>
          )
          : this.renderIncApp()
        }

        <Br style={[sg.mT20, sg.mB15, sg.contentMarginH2]} color={sc.color.gray2} width={1} />

        <View style={[sg.contentMarginH, sg.flexGrow]}>
          <View style={sg.spaceBetween}>
            {isEdit
              ? this.renderEditForm()
              : this.renderReadForm()
            }

            {!complete && !isEdit && (
              <View>
                <Button
                  block
                  style={sg.mV10}
                  onPress={() => {
                    this.editMode();
                  }}
                >
                  <Text>Resume Application</Text>
                </Button>
                <Button
                  bordered
                  dark
                  block
                >
                  <Text>Delete application</Text>
                </Button>
              </View>
            )}
          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(ManageAccountDetails);

export default connect()(res);
