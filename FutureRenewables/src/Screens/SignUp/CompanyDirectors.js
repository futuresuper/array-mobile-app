
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Grid,
  Col,
  Row,
  Icon,
} from 'native-base';
import _ from 'lodash';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';
import {
  styleGlobal,
} from 'src/Styles';

import constants from './constants';
import styles from './styles';

class CompanyDirectors extends React.Component {

  constructor(props) {
    super(props);

    this.formState = {
      firstName: {
        value: '',
        validations: ['required'],
      },
      lastName: {
        value: '',
        validations: ['required'],
      },
    };

    this.state = {
      form: [this.formState],
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('EntityAddress', { type: constants.COMPANY });
    }
  }

  addMore() {
    const { hocs } = this.props;
    const formState = _.cloneDeep(this.formState);
    hocs.addFormItem(formState);
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
          Company Directors
          </Text>

          <Text style={[styleGlobal.textDescription, styleGlobal.mB20]}>
            Please list the name of all current company directors
          </Text>

          <Grid>
            {form && form.map((item, key) => {
              return (
                <Row key={key.toString()} style={[styleGlobal.inputHeightBase, styleGlobal.mB10]}>
                  <Col style={styleGlobal.pR10}>
                    <Input
                      formData={item}
                      dataKey={key}
                      formKey="firstName"
                      placeholder="First Name"
                      onChangeText={hocs.handleInput}
                    />
                  </Col>
                  <Col>
                    <Input
                      formData={item}
                      dataKey={key}
                      formKey="lastName"
                      placeholder="Last Name"
                      onChangeText={hocs.handleInput}
                    />
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col>
                <Button
                  style={styles.addMoreButton}
                  onPress={() => this.addMore()}
                  block
                  transparent
                  gray
                  iconRight
                >
                  <Text>Add More</Text>
                  <Icon name="add" />
                </Button>
              </Col>
            </Row>
          </Grid>

          <Button
            style={styleGlobal.mV30}
            onPress={() => this.handlePress()}
            block
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
])(CompanyDirectors);
export default connect()(res);
