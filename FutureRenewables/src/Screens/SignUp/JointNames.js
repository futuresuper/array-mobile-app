
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import {
  styleGlobal,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';

class JointNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        yourFirstName: {
          validations: ['required'],
        },
        yourLastName: {
          validations: ['required'],
        },
        otherInvestorFirstName: {
          validations: ['required'],
        },
        otherInvestorLastName: {
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

  onChangeInput(e, inputKey) {
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [inputKey]: e,
      },
    });
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('Email');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          Joint Account - Your Names
          </Text>

          <Input
            formData={form}
            formKey="yourFirstName"
            placeholder="Your First Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Input
            formData={form}
            formKey="yourLastName"
            placeholder="Your Last Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Input
            formData={form}
            formKey="otherInvestorFirstName"
            placeholder="Other Investor First Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
              style: styleGlobal.mT20,
            }}
          />

          <Input
            formData={form}
            formKey="otherInvestorLastName"
            placeholder="Other Investor Last Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Button
            onPress={() => this.handlePress()}
            block
            style={styleGlobal.mT20}
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(JointNames);

export default connect()(res);
