
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

import constants from './constants';

class EntityTaxFileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        tfn: {
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

  handlePress() {
    const { screenProps, hocs, navigation } = this.props;
    const type = navigation.getParam('type');

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      if (type === constants.COMPANY) {
        screenProps.navigateTo('BeneficialOwners');
      } else {
        screenProps.navigateTo('Partners');
      }
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Company Tax File Number (TFN)
          </Text>

          <Input
            formData={form}
            formKey="tfn"
            placeholder="Company Tax File Number"
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
            marginVert
          >
            <Text>Next</Text>
          </Button>
          <Button
            onPress={() => this.handlePress()}
            block
            secondary
          >
            <Text>Add TFN later</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(EntityTaxFileNumber);

export default connect()(res);
