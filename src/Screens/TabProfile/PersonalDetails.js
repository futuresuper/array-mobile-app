
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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


import { authUserSelector, userDataUpdate } from 'src/Redux/Auth';


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
    };
  }

  onSave() {
    const { hocs, screenProps, userUpdate } = this.props;

    const formIsValid = hocs.formIsValid();

    if (!formIsValid) {
      return;
    }

    const details = hocs.getFormAsObject();

    screenProps.Api.post('/user', details, (res) => {
      console.log('res', res);
      userUpdate(details);
      screenProps.toastSuccess('Information Updated');
      this.readMode();
    }, () => {
      screenProps.toastDanger('Error. Try again.');
    });
  }

  setEmailForm() {
    const { hocs, user } = this.props;
    const emailForm = {
      email: {
        value: user.email,
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
    const { hocs, user } = this.props;

    const addressForm = {
      address: {
        value: user.address,
        validations: [
          'required',
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
    const { user } = this.props;

    console.log(user);

    return (
      <View>
        <Input
          disabled
          label="Name"
          value={`${user.firstName} ${user.lastName}`}
          style={styles.input}
          containerStyle={styles.inputContainer}
          color2
        />

        <Input
          disabled
          label="Email"
          value={user.email}
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
          value={user.address}
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
          value={user.mobile.number}
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

PersonalDetails.propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const user = authUserSelector(state);

  return {
    user,
  };
};

const mapDispatchToProps = {
  userUpdate: userDataUpdate,
};

const res = composeHoc([
  hocNames.FORM,
])(PersonalDetails);

export default connect(mapStateToProps,
  mapDispatchToProps)(res);
