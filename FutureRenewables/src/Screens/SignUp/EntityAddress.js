
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

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import styles from './styles';

class EntityAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        field: {
          validations: ['required'],
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
  addAddressManually() {
  }

  handlePress() {
    const { screenProps, hocs, navigation } = this.props;
    const type = navigation.getParam('type');

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('EntityOverseasTaxStatus', { type });
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Company Registered Address
          </Text>

          <Input
            formData={form}
            formKey="field"
            onChangeText={hocs.handleInput}
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
])(EntityAddress);

export default connect()(res);
