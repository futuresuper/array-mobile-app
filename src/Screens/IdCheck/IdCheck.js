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
import { localAuthSelector } from 'src/Redux/Auth';


import { sg } from 'src/Styles';
import styles from './styles';

class IdCheck extends PureComponent {
    state = {};

    componentDidMount() {
      const { screenProps, localAuth } = this.props;
      if (localAuth.expires_in > Math.floor(Date.now() / 1000)) {
        screenProps.navigateTo(routeNames.LOCAL_AUTH_HANDLER, {
          next: routeNames.ID_CHECK,
        });
      }
    }


    onPressEditItem(type) {
      const { screenProps } = this.props;
      console.log(`type: ${type}`);
      if (type === 'Drivers Licence') {
        screenProps.navigateTo(routeNames.ID_CHECK_DRIVERS_LICENCE);
      } else {
        screenProps.navigateTo(routeNames.ID_CHECK_AUSTRALIAN_PASSPORT);
      }
    }

    renderButtons() {
      const { user, screenProps } = this.props;
      return (
        <View>
          {(!user.idCheck.driversLicence || user.idCheck.driversLicence === 'notAttempted')
            && (
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
            )
          }
          {(!user.idCheck.australianPassport || user.idCheck.australianPassport === 'notAttempted')
            && (
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
            )
          }
          {/* NEED TO IMPROVE MEDICARE CARD SCREEN AND TEST BEFORE WE TURN THIS ON

            (!user.idCheck.medicareCard || user.idCheck.medicareCard === "notAttempted")
          && (user.idCheck.australianPassport === "matched" || user.idCheck.driversLicence === "matched")
          && <Button
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
      const passportName = user.idCheck.passportMiddleNames
        ? `${user.idCheck.passportFirstName} ${user.idCheck.passportMiddleNames} ${user.idCheck.passportLastName}`
        : `${user.idCheck.passportFirstName} ${user.idCheck.passportLastName}`;
      const dlName = user.idCheck.driversLicenceMiddleNames
        ? `${user.idCheck.driversLicenceFirstName} ${user.idCheck.driversLicenceMiddleNames} ${user.idCheck.driversLicenceLastName}`
        : `${user.idCheck.driversLicenceFirstName} ${user.idCheck.driversLicenceLastName}`;

      if (matchFailed || isVerified) {
        return (
          <View>
            <Grid style={styles.itemBl}>
              <Row>
                <Col>
                  <Text style={[sg.textBold, sg.fS20, sg.colorDark2, sg.mB10]}>{type}</Text>


                  {matchFailed && docType === 'DriversLicence' && (
                  <View>
                    <Text style={[sg.colorDark3]}>{`${user.idCheck.driversLicenceFirstName} ${user.idCheck.driversLicenceLastName}`}</Text>
                    <Text style={[sg.colorDark3, sg.mV5]}>
                      No.&nbsp;
                      {user.idCheck.driversLicenceNumber}
                    </Text>
                    <Text style={[sg.colorDark3]}>
                      State:&nbsp;
                      {user.idCheck.driversLicenceState}
                    </Text>
                  </View>
                  )
                  }

                  {matchFailed && docType === 'Passport' && (
                  <View>
                    <Text style={[sg.colorDark3]}>{passportName}</Text>
                    <Text style={[sg.colorDark3, sg.mV5]}>
                      No.&nbsp;
                      {user.idCheck.passportNumber}
                    </Text>
                  </View>
                  )
                  }

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
      }
      return null;
    }

    render() {
      const { user, screenProps } = this.props;
      // const { list } = this.state;
      return (
        <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>

          <View>
            <Text style={sg.formHeading}>Your ID check</Text>
          </View>
          <View style={[sg.spaceBetween]}>
            <View>

              {(!user.idCheck || user.idCheck.australianPassport !== 'matchFailed' && user.idCheck.driversLicence !== 'matchFailed')
              && (
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
                user,
              )}
              {user.idCheck
              && user.idCheck.australianPassport !== 'notAttempted'
              && this.renderItem(
                idCheckUtils.ID_TYPE.PASSPORT,
                user.idCheck.australianPassport,
                user,
              )}
              {user.idCheck
              && user.idCheck.medicareCard !== 'notAttempted'
              && this.renderItem(
                idCheckUtils.ID_TYPE.MEDICARE_CARD,
                user.idCheck.medicareCard,
                user,
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
  localAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const user = userSelector(state);
  const localAuth = localAuthSelector(state);
  return {
    user,
    localAuth,
  };
};

export default connect(mapStateToProps)(IdCheck);
