import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import {
  Content, Text, Button, View, Icon, Grid, Row, Col,
} from 'native-base';
import TextUnderline from 'src/Components/TextUnderline';

import { routeNames } from 'src/Navigation';

import idCheckUtils from 'src/Common/idCheck';

import EditIcon from 'src/assets/images/Edit.png';

import { userSelector } from 'src/Redux/AppContent';

import { sg } from 'src/Styles';
import styles from './styles';

class IdCheck extends PureComponent {
    // const { user } = this.props;
    state = {};

    componentDidMount() {
      const { screenProps } = this.props;

      // Commented out for now - need to show only if just finished app
      // screenProps.toast('Application Complete', {
      //   iconType: 'MaterialCommunityIcons',
      //   iconName: 'check-circle',
      // });

    }

    onPressEditItem(type) {
      const { screenProps } = this.props;
      console.log("type: " + type);
      type === "Drivers Licence" ?
        screenProps.navigateTo(routeNames.ID_CHECK_DRIVERS_LICENCE)
        : screenProps.navigateTo(routeNames.ID_CHECK_AUSTRALIAN_PASSPORT)
    }

    renderButtons() {
      const { screenProps } = this.props;
      return (
        <View>
          <Button
            block
            marginVert
            style={sg.mT0}
            onPress={() => {
              screenProps.navigateTo(routeNames.ID_CHECK_DRIVERS_LICENCE);
            }}
          >
            <Text>
              {'Add Drivers Licence'}
            </Text>
          </Button>
          <Button
            block
            marginVert
            style={sg.mT0}
            onPress={() => {
              screenProps.navigateTo(routeNames.ID_CHECK_AUSTRALIAN_PASSPORT);
            }}
          >
            <Text>
              {'Add Australian Passport'}
            </Text>
          </Button>
          {/* Commented out for now - need to add conditions
          <Button
            block
            marginVert
            style={sg.mT0}
            onPress={() => {
              screenProps.navigateTo(routeNames.ID_CHECK_MEDICARE_CARD);
            }}
          >

            <Text>
              {'Add Medicare Card'}
            </Text>
          </Button>
          */}
        </View>
      );
    }

    renderItem(docType, status, user) {
      const matchFailed = status === 'matchFailed';
      const isVerified = status === 'matched';
      const type = idCheckUtils.getTypeName(docType);

      if (matchFailed || isVerified) {
        return (
          <View>
            <Grid style={styles.itemBl}>
              <Row>
                <Col>
                  <Text style={[sg.textBold, sg.fS20, sg.colorDark2, sg.mB10]}>{type}</Text>

                  {/*

                    matchFailed && type === "Drivers Licence" && (
                  <View>
                    <Text style={[sg.colorDark3]}>{user.idCheck.driversLicenceFirstName + " " + user.idCheck.driversLicenceLastName}</Text>
                    <Text style={[sg.colorDark3, sg.mV5]}>
                      No.
                      {user.idCheck.driversLicenceNumber}
                    </Text>
                    <Text style={[sg.colorDark3]}>
                      State:
                      {user.idCheck.driversLicenceState}
                    </Text>
                  </View>
                  )
                  */}

                </Col>
                <Col style={sg.width20}>
                  {matchFailed && (
                  <TouchableOpacity onPress={() => this.onPressEditItem(type)}>
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
      } else {
        return null;
      }
    }

    render() {
      const { user, screenProps } = this.props;
      //const { list } = this.state;
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

              {user.idCheck
                && (user.idCheck.australianPassport === 'matchFailed' || user.idCheck.driversLicence === 'matchFailed')
                && (
              <View>
                <Text style={sg.mB15}>
                  We weren’t able to verify you with the ID you provided. Please check the details
                  below are accurate or try another ID.
                </Text>

                {/*
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
                */}
              </View>
              )}
            </View>
            <View>
              {user.idCheck
              && user.idCheck.driversLicence !== 'notAttempted'
              && this.renderItem(
                idCheckUtils.ID_TYPE.DRIVERS_LICENSE,
                user.idCheck.driversLicence,
                user
              )}
              {user.idCheck
              && user.idCheck.australianPassport !== 'notAttempted'
              && this.renderItem(
                idCheckUtils.ID_TYPE.PASSPORT,
                user.idCheck.australianPassport,
                user
              )}
              {user.idCheck
              && user.idCheck.medicareCard !== 'notAttempted'
              && this.renderItem(
                idCheckUtils.ID_TYPE.MEDICARE_CARD,
                user.idCheck.medicareCard,
                user
              )}
            </View>
            <View>
              {this.renderButtons()}
              {user.idCheck
                && (user.idCheck.australianPassport === 'matchFailed' || user.idCheck.driversLicence === 'matchFailed')
                && (
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

const mapStateToProps = (state) => {
  const user = userSelector(state);
  return {
    user,
  };
};

export default connect(mapStateToProps)(IdCheck);
