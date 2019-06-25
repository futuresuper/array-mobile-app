
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Button,
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
import EditButton from 'src/Components/EditButton';

import {
  sg,
  sc,
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
      details: props.screenProps.userInfo(),
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

    details.address = details.residenitalAddressStreet;

    details.tfn = 'Supplied';
    details.touchFaceId = true;
    details.pin = '123';

    hocs.setFormFromObject(details).then(() => {
      hocs.setFieldValidations('email', [
        'required',
        'email',
      ]);

      hocs.setFieldValidations('address', [
        'required',
      ]);
    });
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
      <EditButton
        onPress={() => {
          this.editMode();
        }}
      />
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
          labelGray
          value={`${form.firstName.value} ${details.lastName}`}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Email"
          labelGray
          value={details.email}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Address"
          labelGray
          value={details.address}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="TFN"
          labelGray
          value={details.tfn}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Touch / Face ID"
          labelGray
          value={details.touchFaceId ? 'On' : 'Off'}
          style={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          disabled
          label="Pin"
          labelGray
          value={details.pin}
          secureTextEntry
          style={styles.input}
          containerStyle={styles.inputContainer}
        />
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
          labelGray
          value={`${form.firstName.value} ${form.lastName.value}`}
          style={[styles.input, sg.colorGray12]}
          containerStyle={styles.inputContainer}
        />

        <Input
          formData={form}
          formKey="email"
          label="Email"
          labelGray
          style={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={hocs.handleInput}
        />

        <Input
          formData={form}
          formKey="address"
          label="Adddress"
          labelGray
          style={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={hocs.handleInput}
        />

        <Input
          disabled
          label="TFN"
          labelGray
          value={form.tfn.value}
          style={[styles.input, sg.colorGray12]}
          containerStyle={styles.inputContainer}
        />

        <Switch
          formData={form}
          formKey="touchFaceId"
          label="Touch / Face ID"
          labelGray
          title={form.touchFaceId.value ? 'On' : 'Off'}
          onPress={hocs.handleCheckBox}
        />

        <Input
          formData={form}
          formKey="pin"
          label="Pin"
          labelGray
          style={[styles.input]}
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

        <Br style={[sg.mT20, sg.mB15, sg.contentMarginH2]} color={sc.color.gray2} width={1} />

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
