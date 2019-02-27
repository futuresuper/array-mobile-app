import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Content,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

import composeHoc from 'src/Common/Hocs';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: {
          value: '',
          // validations: [
          //   'required',
          // ],
        },
        lastName: {
          value: '',
          validations: [
            'email',
            'required',
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

  onFormChangeInput(e, key) {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [key]: {
          ...form[key],
          value: e,
        },
      },
    });
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    hocs.formIsValid();
    // navigateTo('Email');

    // this.props.hocs.hz();
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;
    console.log('!!!', { hocs });

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your name
          </Text>

          <Item regular error={(form && form.firstName.error) || false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="First Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { hocs.handleInput(e, 'firstName'); }}
              value={(form && form.firstName.value) || ''}
            />
          </Item>

          <Item regular error={(form && form.lastName.error) || false}>
            <Input
              returnKeyType="next"
              placeholder="Last Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { hocs.handleInput(e, 'lastName'); }}
              value={(form && form.lastName.value) || ''}
            />
          </Item>

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
])(Name);

export default connect()(res);
