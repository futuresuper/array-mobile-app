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
import {
  Input,
} from 'src/Components/Form';
import Autocomplete from 'src/Components/Autocomplete';

import styles from './styles';

class HomeAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        address: {
          validations: ['required'],
        },
      },
      autoAddress: '',
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  onChangeText(e) {
    console.log('!!!.', { e });

    this.setState({
      autoAddress: e,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addAddressManually() {
    alert('ok');
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('InitialInvestmentAmount');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder bounces={false} contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your Home Address
          </Text>

          <Input
            formData={form}
            formKey="address"
            onChangeText={hocs.handleInput}
          />

          <Autocomplete
            onChangeText={(e) => { this.onChangeText(e); }}
          />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>

          <Button
            onPress={() => this.addAddressManually()}
            transparent
            block
          >
            <Text style={styles.addAddressManually}>Add address manually</Text>
          </Button>

          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(HomeAddress);

export default connect()(res);
