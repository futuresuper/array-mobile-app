
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
  Input,
  Switch,
} from 'src/Components/Form';
import Br from 'src/Components/Br';
import PickerIngAccount from 'src/Components/PickerIngAccount';
import EditButton from 'src/Components/EditButton';

import {
  sg,
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
      title: details.nickname,
    });

    this.setState({
      details,
    }, () => {
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
      ].includes(key)) {
        form[key].validations = [
          'required',
        ];
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
      !details.complete
      || isEdit
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
    const { details } = this.state;
    let regularInvestmentAmmount = '-';

    if (details.regularInvestmentAmmount) {
      regularInvestmentAmmount = `$${details.regularInvestmentAmmount} / month`;
    }

    return (
      <View>
        <Input
          disabled
          label="Nickname"
          labelGray
          value={details.nickname || '-'}
          style={styles.input}
        />

        <Input
          disabled
          label="Linked Bank Account"
          labelGray
          value={details.bankAccount || '-'}
          style={styles.input}
        />

        <Input
          disabled
          label="Distributions"
          labelGray
          value={details.distributions ? 'Reinvested' : '-'}
          style={styles.input}
        />

        <Input
          disabled
          label="Regular investment ammount"
          labelGray
          value={regularInvestmentAmmount}
          style={styles.input}
        />

        {details.complete && (
          <Input
            disabled
            label="Authorised admins"
            labelGray
            value={details.admins}
            style={styles.input}
          />
        )}
      </View>
    );
  }

  renderEditFormButtons() {
    return (
      <View>
        <Button
          gray4
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
      <View>
        <Input
          formData={form}
          formKey="nickname"
          label="Nickname"
          labelGray
          onChangeText={hocs.handleInput}
          style={styles.input}
        />

        <PickerIngAccount
          formData={form}
          formKey="bankAccount"
          label="Linked Bank Account"
          labelGray
          title={form.bankAccount.value}
          titleStyle={styles.input}
          onPressItem={({ item }, formKey, dataKey) => {
            hocs.handlePicker(item.number, formKey, dataKey);
            hocs.setFormTitle(item.number, formKey, dataKey);
          }}
        />

        <Switch
          formData={form}
          formKey="distributions"
          label="Distributions"
          labelGray
          title="Reinvested"
          titleStyle={styles.input}
          onPress={hocs.handleCheckBox}
        />

        <Input
          formData={form}
          formKey="regularInvestmentAmmount"
          label="Regular investment ammount"
          labelGray
          onChangeText={hocs.handleInput}
          keyboardType="numeric"
          iconLeft={{
            type: 'FontAwesome',
            name: 'dollar',
            style: styles.inputLeftIcon,
          }}
          style={styles.input}
        />

        <Input
          disabled
          label="Authorised admins"
          labelGray
          value={form.admins.value}
          style={styles.input}
          onLabelRightIcon={() => {
            alert('hello');
          }}
        />

        {this.renderEditFormButtons()}
      </View>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderIncApp() {
    return (
      <View style={[sg.incAppBl, sg.aSCenter]}>
        <Text style={[sg.fS14, sg.mH10]}>Incomplete application</Text>
      </View>
    );
  }

  render() {
    const { details, isEdit } = this.state;

    return (
      <Content padder contentContainerStyle={sg.pT0}>
        {details.complete
          ? <Text style={sg.aSCenter}>{details.balance}</Text>
          : this.renderIncApp()
        }

        <Br style={[sg.mT20, sg.mB10]} />

        <View style={sg.contentPadding}>
          {isEdit
            ? this.renderEditForm()
            : this.renderReadForm()
          }

          {!details.complete && !isEdit && (
            <View>
              <Button
                gray4
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
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(ManageAccountDetails);

export default connect()(res);
