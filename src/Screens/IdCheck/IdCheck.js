import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { Content, Text, Button, View, Icon, Grid, Row, Col } from 'native-base';
import TextUnderline from 'src/Components/TextUnderline';

import { routeNames } from 'src/Navigation';

import idCheckUtils from 'src/Common/idCheck';

import EditIcon from 'src/assets/images/Edit.png';

import { userSelector } from 'src/Redux/AppContent';

import { sg } from 'src/Styles';
import styles from './styles';

class IdCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          type: idCheckUtils.ID_TYPE.DRIVERS_LICENSE,
          name: 'Olivia King',
          licenceNumber: '123123123',
          state: 'NSW',
          verified: true,
        },
        {
          type: idCheckUtils.ID_TYPE.PASSPORT,
          name: 'Olivia King',
          licenceNumber: '123123123',
          state: 'NSW',
          verified: false,
        },
      ],
    };
  }

  componentDidMount() {
    const { screenProps } = this.props;
    screenProps.toast('Application Complete', {
      iconType: 'MaterialCommunityIcons',
      iconName: 'check-circle',
    });
  }

  renderButton(type) {
    const { screenProps } = this.props;
    const name = idCheckUtils.getTypeName(type);

    return (
      <Button
        block
        marginVert
        style={sg.mT0}
        onPress={() => {
          screenProps.navigateTo(routeNames.ID_CHECK_DETAILS, { newItemByType: type });
        }}
      >
        <Text>Add {name}</Text>
      </Button>
    );
  }

  onPressEditItem(item) {
    const { screenProps } = this.props;

    screenProps.navigateTo(routeNames.ID_CHECK_DETAILS, { item });
  }

  renderItem(docType, status, user, item) {
    const isVerified = status === 'matched';
    const type = idCheckUtils.getTypeName(docType);

    return (
      <View>
        <Grid style={styles.itemBl}>
          <Row>
            <Col>
              <Text style={[sg.textBold, sg.fS20, sg.colorDark2, sg.mB10]}>{type}</Text>

              {!isVerified && (
                <View>
                  <Text style={[sg.colorDark3]}>{user.fullName}</Text>
                  <Text style={[sg.colorDark3, sg.mV5]}>
                    No.
                    {item.licenceNumber}
                  </Text>
                  <Text style={[sg.colorDark3]}>
                    State:
                    {item.state}
                  </Text>
                </View>
              )}
            </Col>
            <Col style={sg.width20}>
              {!isVerified && (
                <TouchableOpacity onPress={() => this.onPressEditItem(item)}>
                  <Image source={EditIcon} />
                </TouchableOpacity>
              )}
            </Col>
          </Row>
          {isVerified ? (
            <Row style={[sg.mT15, sg.aICenter]}>
              <Icon name="ios-close-circle" style={styles.itemStatusIconOk} />
              <Text style={styles.itemStatusTextOk}>Verified</Text>
            </Row>
          ) : (
            <Row style={[sg.mT15, sg.aICenter]}>
              <Icon name="ios-close-circle" style={styles.itemStatusIconErr} />
              <Text style={styles.itemStatusTextErr}>Details didn’t match</Text>
            </Row>
          )}
        </Grid>
      </View>
    );
  }

  render() {
    const { user, screenProps } = this.props;
    const { list } = this.state;
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View>
          <Text style={sg.formHeading}>Your ID check</Text>
        </View>
        <View style={[sg.spaceBetween]}>
          <View>
            {!user.idCheck && (
              <View>
                <Text style={sg.formHeadingDescription}>
                  Please provide your Drivers Licence or Passport Number
                </Text>
              </View>
            )}

            {user.idCheck && user.idCheck.australianPassport !== 'matchFailed' && (
              <View>
                <Text style={sg.mB15}>
                  We weren’t able to verify you with the ID you provided. Please check the details
                  below are accurate or try another ID.
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
              </View>
            )}
          </View>
          <View>
            {user.idCheck &&
              user.idCheck.driversLicence !== 'notAttempted' &&
              this.renderItem(
                idCheckUtils.ID_TYPE.DRIVERS_LICENSE,
                user.idCheck.driversLicence,
                user,
                list[0],
              )}
            {user.idCheck &&
              user.idCheck.australianPassport !== 'notAttempted' &&
              this.renderItem(
                idCheckUtils.ID_TYPE.PASSPORT,
                user.idCheck.australianPassport,
                user,
                list[0],
              )}
            {user.idCheck &&
              user.idCheck.medicareCard !== 'notAttempted' &&
              this.renderItem(
                idCheckUtils.ID_TYPE.MEDICARE_CARD,
                user.idCheck.medicareCard,
                user,
                list[0],
              )}
          </View>
          <View>
            {this.renderButton(idCheckUtils.ID_TYPE.DRIVERS_LICENSE)}
            {this.renderButton(idCheckUtils.ID_TYPE.PASSPORT)}
            {this.renderButton(idCheckUtils.ID_TYPE.MEDICARE_CARD)}
            {user.idCheck && user.idCheck.driversLicence === 'matchFailed' && (
              <Button
                bordered
                dark
                block
                marginVert
                style={sg.mT0}
                onPress={() => {
                  screenProps.navigateTo(routeNames.POST_US_CERTIFIED_ID);
                }}
              >
                <Text>Post us certified ID</Text>
              </Button>
            )}
          </View>
        </View>
      </Content>
    );
  }
}

IdCheck.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const user = userSelector(state);
  return {
    user,
  };
};

export default connect(mapStateToProps)(IdCheck);
