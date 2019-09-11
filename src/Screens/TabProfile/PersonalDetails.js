
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Button,
} from 'native-base';

import { mapValues, set } from 'lodash';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';
import {
  Input,
  Switch,
} from 'src/Components/Form';
import Br from 'src/Components/Br';
import EditButton from 'src/Components/EditButton';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class PersonalDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: navigation.state.params.headerRight,
  });

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      details: props.screenProps.getUserInfo(),
    };
  }

  componentDidMount() {
    this.setForm();
    this.displayHeaderRight();
  }

  onSave() {
    const { hocs } = this.props;

    const formIsValid = hocs.formIsValid();

    if (!formIsValid) {
      return;
    }

    const details = hocs.getFormAsObject();

    this.setState({
      details,
    });

    this.readMode();
  }

  setForm() {
    const { hocs } = this.props;
    const { details } = this.state;

    const detailsForm = mapValues(details, detail => ({
      value: detail,
    }));

    set(detailsForm, 'address.value', details.residenitalAddressStreet);
    set(detailsForm, 'address.validations', ['required']);
    set(detailsForm, 'tfn.value', 'Supplied');
    set(detailsForm, 'touchFaceId.value', true);
    set(detailsForm, 'pin.value', 123);
    set(detailsForm, 'firstName.value', details.firstName || '');
    set(detailsForm, 'email.value', details.email || '');
    set(detailsForm, 'email.validations', ['required', 'email']);

    hocs.setForm(detailsForm);
  }

  readMode() {
    this.setState({
      isEdit: false,
    }, () => {
      this.displayHeaderRight();
    });
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
    const { isEdit } = this.state;

    if (isEdit) {
      return;
    }

    const headerRight = (
      {/*
      <EditButton
        onPress={() => {
          this.editMode();
        }}
      />
      */}
    );

    navigation.setParams({
      headerRight,
    });
  }

  renderReadForm() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { details } = this.state;

    if (!form) {
      return null;
    }

    return (
      <View>
        <Input
          disabled
          label="Name"
          value={`${form.firstName.value} ${details.lastName}`}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        <Input
          disabled
          label="Email"
          value={details.email}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        {/*
        <Input
          disabled
          label="Address"
          value={details.address}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        <Input
          disabled
          label="TFN"
          value={details.tfn}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        <Input
          disabled
          label="Touch / Face ID"
          value={details.touchFaceId ? 'On' : 'Off'}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        <Input
          disabled
          label="Pin"
          value={details.pin}
          secureTextEntry
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        */}
      </View>
    );
  }

  renderEditForm() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <View>
        <Input
          disabled
          label="Name"
          value={`${form.firstName.value} ${form.lastName.value}`}
          containerStyle={styles.inputContainer}
          color5
        />

        <Input
          formData={form}
          formKey="email"
          label="Email"
          style={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={hocs.handleInput}
          color2
        />

        <Input
          formData={form}
          formKey="address"
          label="Adddress"
          labelGray
          style={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={hocs.handleInput}
          color2
        />

        <Input
          disabled
          label="TFN"
          value={form.tfn.value}
          containerStyle={styles.inputContainer}
          color5
        />

        <Switch
          formData={form}
          formKey="touchFaceId"
          label="Touch / Face ID"
          title={form.touchFaceId.value ? 'On' : 'Off'}
          onPress={hocs.handleCheckBox}
          titleStyle={sg.colorDark2}
        />

        <Input
          key={123}
          formData={form}
          formKey="pin"
          label="Pin"
          style={[styles.input, sg.colorDark3]}
          onChangeText={hocs.handleInput}
          secureTextEntry
        />

        <Button
          block
          style={[sg.mT30, sg.mB10]}
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


  render() {
    const { isEdit } = this.state;

    return (
      <Content bounces={false}>

        <Br style={[sg.mT20, sg.mB15, sg.contentMarginH2]} brList width={1} />

        <View style={sg.contentMarginH2}>
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
])(PersonalDetails);

export default connect()(res);
