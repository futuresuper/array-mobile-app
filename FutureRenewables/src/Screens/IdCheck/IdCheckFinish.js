
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
} from 'react-native';
import {
  Content,
  Text,
  View,
  Button,
  Icon,
  Grid,
  Row,
  Col,
} from 'native-base';

import TextUnderline from 'src/Components/TextUnderline';

import {
  sg,
} from 'src/Styles';

import EditIcon from 'src/assets/images/Edit.png';

import styles from './styles';

class IdCheckFinish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          type: 'Drivers License',
          name: 'Olivia King',
          no: '123123123',
          state: 'NSW',
          verified: true,
        },
        {
          type: 'Passport',
          name: 'Olivia King',
          no: '123123123',
          state: 'NSW',
          verified: false,
        },
      ],
    };
  }

  renderItem({ item }) {
    return (
      <Grid style={styles.itemBl}>
        <Row>
          <Col>
            <Text style={[sg.textBold, sg.fS20, sg.colorDark2, sg.mB10]}>{item.type}</Text>

            <Text style={[sg.colorDark3]}>{item.name}</Text>
            <Text style={[sg.colorDark3, sg.mV5]}>
              No.
              {item.no}
            </Text>
            <Text style={[sg.colorDark3]}>
              State:
              {item.state}
            </Text>
          </Col>
          <Col style={sg.width20}>
            <Image source={EditIcon} />
          </Col>
        </Row>
        {item.verified
          ? (
            <Row style={[sg.mT15, sg.aICenter]}>
              <Icon name="ios-close-circle" />
              <Text>Verified</Text>
            </Row>
          )
          : (
            <Row style={[sg.mT15, sg.aICenter]}>
              <Icon name="ios-close-circle" />
              <Text>Verified</Text>
            </Row>
          )
        }
      </Grid>
    );
  }

  render() {
    const { list } = this.state;
    console.log('!!!: IdCheckFinish -> render -> list', list);

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32, sg.mB25]}>
              Finish your ID check
            </Text>

            <Text style={sg.mB15}>
            We weren’t able to verify you with the ID you provided. Please check the details below are accurate or try another ID.
            </Text>

            <TextUnderline
              iconRight={{
                type: 'Feather',
                name: 'arrow-right',
                style: sg.fS20,
              }}
              styleText={[sg.fS16]}
              style={sg.aSStart}
            >
              How to certify ID.
            </TextUnderline>

            <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(...args) => this.renderItem(...args)}
              bounces={false}
              contentContainerStyle={[sg.mT20]}
            />

          </View>


          <Button
            block
            iconRight
          >
            <Text>Add other ID</Text>
            <Icon name="add" />
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(IdCheckFinish);
