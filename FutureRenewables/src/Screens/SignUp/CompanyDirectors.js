
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Item,
  Input,
  Text,
  Grid,
  Col,
  Row,
  Icon,
} from 'native-base';

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
      },
      secondName: {
        value: '',
      },
    };

    this.state = {
      form: [this.formState],
    };
  }

  onChangeInput(e, inputKey) {
    const { form } = this.state;
  }

  handlePress() {
    const { screenProps } = this.props;
    screenProps.navigateTo('EntityAddress', { type: constants.COMPANY });
  }

  addMore() {
    const { form } = this.state;
    form.push(this.formState);

    this.setState(form);
  }

  render() {
    const { form } = this.state;

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
            {form.map((item, key) => {
              return (
                <Row key={key.toString()} style={[styleGlobal.inputHeightBase, styleGlobal.mB10]}>
                  <Col style={styleGlobal.pR10}>
                    <Item regular error={false} style={styleGlobal.mL0}>
                      <Input
                        returnKeyType="next"
                        placeholder="First Name"
                        textCenter
                        autoCorrect={false}
                        onChangeText={(e) => { this.onChangeInput(e, 'firstName'); }}
                        // value={item.firstName.value}
                      />
                    </Item>
                  </Col>
                  <Col>
                    <Item regular error={false}>
                      <Input
                        returnKeyType="next"
                        placeholder="Last Name"
                        textCenter
                        autoCorrect={false}
                        onChangeText={(e) => { this.onChangeInput(e, 'secondName'); }}
                        // value={item.secondName.value}
                      />
                    </Item>
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

export default connect()(CompanyDirectors);
