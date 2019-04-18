
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
} from 'react-native';

import {
  Button,
  Content,
  Text,
  Icon,
  H2,
  Left,
  Right,
  Thumbnail,
  Grid,
  Col,
  List,
  ListItem,
  Item,
  Label,
  Row,
} from 'native-base';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';
import {
  Input,
  Picker,
  CheckBox,
  Switch,
} from 'src/Components/Form';
import Br from 'src/Components/Br';
import PickerIngAccount from 'src/Components/PickerIngAccount';

import {
  routeNames,
} from 'src/Navigation';

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
      details: {
        nickname: 'Mel & Andrew',
        balance: '$12,091.00',
        bankAccount: 'ING Account 98018',
        distributions: false,
        regularInvestmentAmmount: '20',
        admins: 'Jackie Chan, Bruce Lee',
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { details } = this.state;

    navigation.setParams({
      title: details.nickname,
      headerRight: this.renderHeaderRight(),
    });
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

      if (key !== 'distributions') {
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

  readMode() {
    const { navigation } = this.props;

    this.setState({
      isEdit: false,
    });

    navigation.setParams({
      headerRight: this.renderHeaderRight(),
    });
  }

  renderHeaderRight() {
    return (
      <Button
        transparent
        icon
        onPress={() => {
          this.editMode();
        }}
      >
        <Icon type="FontAwesome" name="edit" />
      </Button>
    );
  }

  renderReadForm() {
    const { details } = this.state;
    const regularInvestmentAmmount = `$${details.regularInvestmentAmmount} / month`;

    return (
      <View>
        <Input
          disabled
          label="Nickname"
          labelGray
          value={details.nickname}
        />

        <Input
          disabled
          label="Linked Bank Account"
          labelGray
          value={details.bankAccount}
        />

        <Input
          disabled
          label="Distributions"
          labelGray
          value="Reinvested"
        />

        <Input
          disabled
          label="Regular investment ammount"
          labelGray
          value={regularInvestmentAmmount}
        />

        <Input
          disabled
          label="Authorised admins"
          labelGray
          value={details.admins}
        />
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
            this.readMode();
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
        />

        <PickerIngAccount
          formData={form}
          formKey="bankAccount"
          label="Linked Bank Account"
          labelGray
          title={form.bankAccount.value}
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
          onPress={hocs.handleCheckBox}
        />

        <Input
          formData={form}
          formKey="regularInvestmentAmmount"
          label="regularInvestmentAmmount"
          labelGray
          onChangeText={hocs.handleInput}
          keyboardType="numeric"
          iconLeft={{
            type: 'FontAwesome',
            name: 'dollar',
          }}
        />

        <Input
          disabled
          label="Authorised admins"
          labelGray
          value={form.admins.value}
        />

        {this.renderEditFormButtons()}
      </View>
    );
  }

  render() {
    const { details, isEdit } = this.state;

    return (
      <Content padder contentContainerStyle={sg.pT0}>
        <Text style={sg.aSCenter}>{details.balance}</Text>

        <Br style={[sg.mT20, sg.mB10]} />

        <View style={sg.contentPadding}>
          {isEdit
            ? this.renderEditForm()
            : this.renderReadForm()
          }

        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(ManageAccountDetails);

export default connect()(res);
