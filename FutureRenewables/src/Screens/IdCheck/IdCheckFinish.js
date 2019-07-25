
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
  TouchableOpacity,
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
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

import idCheckUtils from 'src/Common/idCheck';

import EditIcon from 'src/assets/images/Edit.png';

import styles from './styles';

class IdCheckFinish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          type: idCheckUtils.ID_TYPE.DRIVERS_LICENSE,
          name: 'Olivia King',
          licenseNumber: '123123123',
          state: 'NSW',
          verified: true,
        },
        {
          type: idCheckUtils.ID_TYPE.PASSPORT,
          name: 'Olivia King',
          licenseNumber: '123123123',
          state: 'NSW',
          verified: false,
        },
      ],
    };
  }

  onPressEditItem(item) {
    const { screenProps } = this.props;

    screenProps.navigateTo(routeNames.ID_CHECK_DETAILS, { item });
  }

  renderItem({ item }) {
    const isVerified = item.verified;
    const type = idCheckUtils.getTypeName(item.type);

    return (
      <Grid style={styles.itemBl}>
        <Row>
          <Col>
            <Text style={[sg.textBold, sg.fS20, sg.colorDark2, sg.mB10]}>{type}</Text>

            <Text style={[sg.colorDark3]}>{item.name}</Text>
            <Text style={[sg.colorDark3, sg.mV5]}>
              No.
              {item.licenseNumber}
            </Text>
            <Text style={[sg.colorDark3]}>
              State:
              {item.state}
            </Text>
          </Col>
          <Col style={sg.width20}>
            {isVerified && (
              <TouchableOpacity
                onPress={() => this.onPressEditItem(item)}
              >
                <Image source={EditIcon} />
              </TouchableOpacity>
            )}
          </Col>
        </Row>
        {isVerified
          ? (
            <Row style={[sg.mT15, sg.aICenter]}>
              <Icon name="ios-close-circle" style={styles.itemStatusIconErr} />
              <Text style={styles.itemStatusTextErr}>Details didn’t match</Text>
            </Row>
          )
          : (
            <Row style={[sg.mT15, sg.aICenter]}>
              <Icon name="ios-close-circle" style={styles.itemStatusIconOk} />
              <Text style={styles.itemStatusTextOk}>Verified</Text>
            </Row>
          )
        }
      </Grid>
    );
  }

  render() {
    const { screenProps } = this.props;
    const { list } = this.state;

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
              theme
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
            style={sg.mT10}
            onPress={() => {
              screenProps.navigateTo(routeNames.ID_CHECK_ADD);
            }}
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
