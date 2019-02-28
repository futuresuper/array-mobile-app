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

class DateOfBirth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        date: {
          validations: [
            'required',
            'date',
          ],
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  handleInput = (e, formKey) => {
    const { hocs } = this.props;
    let value = e.replace(/\/+/g, '');
    const firstFourChars = this.addItemEvery(value.substring(0, 5), '/', 2);
    value = firstFourChars + value.substring(5, value.length);

    hocs.handleInput(value, formKey);
  }

  // eslint-disable-next-line class-methods-use-this
  addItemEvery(strInp, item, every) {
    let str = strInp;

    for (let i = 0; i < str.length; i += 1) {
      if (!(i % (every + 1))) {
        str = str.substring(0, i) + item + str.substring(i);
      }
    }

    return str.substring(1);
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('HomeAddress');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Date of Birth
          </Text>

          <Input
            formData={form}
            formKey="date"
            placeholder="DD/MM/YYYY"
            onChangeText={this.handleInput}
            keyboardType="numeric"
          />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(DateOfBirth);

export default connect()(res);
