
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

import ListLinks from 'src/Components/ListLinks';
import constants from './constants';

class AbnOrAcn extends React.Component {
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

  handlePress() {
    const { hocs } = this.props;
    hocs.formIsValid();
  }

  render() {
    const { screenProps } = this.props;
    const { hocs } = this.props;
    const { form } = hocs;


    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          ABN or ACN
          </Text>

          <Input
            formData={form}
            formKey="field"
            placeholder="ABN or ACN"
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
            <Text>Search</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>

        <ListLinks
          absolute
          navigateTo={screenProps.navigateTo}
          data={[
            {
              name: 'Sole Trader',
              screen: 'SoleTraderConfirmation',
            },
            {
              name: 'Company',
              screen: 'EntityContactDetails',
              params: { type: constants.COMPANY },
            },
            {
              name: 'Partnership',
              screen: 'EntityContactDetails',
              params: { type: constants.PARTNERSHIP },
            },
          ]}
        />
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(AbnOrAcn);

export default connect()(res);
