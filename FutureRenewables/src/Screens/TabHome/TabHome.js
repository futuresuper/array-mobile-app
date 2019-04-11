
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Text,
  Content,
  Button,
  Icon,
  H1,
  Grid,
  Col,
  Row,
} from 'native-base';

import {
  sg,
} from 'src/Styles';
import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class TabHome extends Component {
  render() {
    return (
      <Content padder>
        <View>
          <Grid>
            <Row>
              <Icon name="add" />
              <Text>asd</Text>
            </Row>
            <Row>
              <Text note>asd</Text>
            </Row>
          </Grid>
        </View>


        <View>
          <Button
            transparent
            iconRight
            style={sg.mB10}
          >
            <Text style={styles.title}>Grace</Text>
            <Icon name="ios-arrow-down" style={styles.titleIcon} />
          </Button>

          <H1 style={styles.mainAmount}>$1,978</H1>
        </View>
      </Content>
    );
  }
}

export default connect()(TabHome);
