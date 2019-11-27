/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { routeNames } from 'src/Navigation';

import {
  Content, Text, Button, Icon, Grid, Col,
} from 'native-base';
import { sg } from 'src/Styles';

const CircleIcon = () => <Icon type="AntDesign" name="checkcircle" style={{ color: '#51CCAA' }} />;

class WhatsNext extends Component {
  handleNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.TAB_HOME);
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[sg.formHeading]}>
              {"What's Next"}
            </Text>
            <View>
              <Grid style={[sg.pB30]}>
                <Col style={sg.width50}>
                  <CircleIcon />
                </Col>
                <Col>
                  <Text style={[sg.textBold, sg.fS17]}>
                    Now
                  </Text>
                  <Text style={[sg.fS11]}>
                    {'Your application is complete, and the direct debit for your initial investment has been requested from your bank.'}
                  </Text>
                </Col>
              </Grid>
              <Grid style={[sg.pB30]}>
                <Col style={sg.width50}>
                  <CircleIcon />
                </Col>
                <Col>
                  <Text style={[sg.textBold, sg.fS17]}>
                    A few minutes from now
                  </Text>
                  <Text style={[sg.fS11]}>
                    {'We’ll send you a confirmation email.'}
                  </Text>
                </Col>
              </Grid>
              <Grid style={[sg.pB30]}>
                <Col style={sg.width50}>
                  <CircleIcon />
                </Col>
                <Col>
                  <Text style={[sg.textBold, sg.fS17]}>
                    A few days from now
                  </Text>
                  <Text style={[sg.fS11]}>
                    {'Once we’ve received your direct debit payment you’ll see your updated balance in the Array app, and we’ll send you a confirmation email.'}
                  </Text>
                </Col>
              </Grid>
            </View>
          </View>
          <View>
            <Button onPress={() => this.handleNext()} block>
              <Text>Got it!</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WhatsNext);
