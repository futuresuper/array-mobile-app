
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

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';
import {
  Input,
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
      isEmailEdit: false,
      isAddressEdit: false,
      details: props.screenProps.getUserInfo(),
    };
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

  setEmailForm() {
    const { hocs } = this.props;
    const emailForm = {
      email: {
        validations: [
          'required',
          'email',
        ],
      },

    };
    hocs.setForm(emailForm).then(() => {
      this.setState({ isEmailEdit: true });
    });
  }

  setAddressForm() {
    const { hocs } = this.props;

    const addressForm = {
      address: {
        validations: [
          'required',
          'email',
        ],
      },
    };
    hocs.setForm(addressForm).then(() => {
      this.setState({ isAddressEdit: true });
    });
  }

  readMode() {
    this.setState({
      isEmailEdit: false,
      isAddressEdit: false,
    });
  }


  renderReadForm() {
    const { details } = this.state;

    console.log(details);

    return (
      <View>
        <Input
          disabled
          label="Name"
          value={`${details.firstName} ${details.lastName}`}
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
          componentRight={(
            <EditButton
              onPress={() => {
                this.setEmailForm();
              }}
            />
          )}
        />

        <Input
          disabled
          label="Address"
          value={details.address}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
          componentRight={(
            <EditButton
              onPress={() => {
                this.setAddressForm();
              }}
            />
          )}
        />

        <Input
          disabled
          label="Mobile"
          value={details.mobile.number}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />
      </View>
    );
  }

  renderEditEmailForm() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <View>
        <Input
          formData={form}
          formKey="email"
          label="Email"
          style={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={hocs.handleInput}
          color2
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

  renderEditAddressForm() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <View>
        <Input
          formData={form}
          formKey="address"
          label="Address"
          style={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={hocs.handleInput}
          color2
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
    const { isEmailEdit, isAddressEdit } = this.state;

    return (
      <Content bounces={false}>

        <Br style={[sg.mT20, sg.mB15, sg.contentMarginH2]} brList width={1} />

        <View style={sg.contentMarginH2}>
          {isEmailEdit && this.renderEditEmailForm()}
          {isAddressEdit && this.renderEditAddressForm()}
          {!isEmailEdit && !isAddressEdit && this.renderReadForm()}
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(PersonalDetails);

export default connect()(res);
