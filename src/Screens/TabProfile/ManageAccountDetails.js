
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Content,
  Text,
  List,
  ListItem,
  Body,
  Grid,
  Row,
  Col,
} from 'native-base';

import EditButton from 'src/Components/EditButton';

import {
  routeNames,
} from 'src/Navigation';

import {
  getAccountByIdSelector,
  appContentUpdateAccount,
} from 'src/Redux/AppContent';

import {
  accountUpdateSave,
} from 'src/Redux/Account';

import {
  sg,
} from 'src/Styles';

class ManageAccountDetails extends Component {
  onUpdate(value, key) {
    const {
      screenProps,
      id,
      appContentUpdateAccountConnect,
      accountUpdateSaveConnect,
    } = this.props;
    const data = {
      [key]: value,
    };

    screenProps.Api.post('/account', {
      accountId: id,
      ...data,
    }, () => {
      const dataStore = {
        id,
        ...data,
      };

      appContentUpdateAccountConnect(dataStore);
      accountUpdateSaveConnect(dataStore);

      screenProps.toastSuccessIcon('asdasd');
      screenProps.routeBack();
    }, () => {
      screenProps.toastDanger('Error');
    });
  }

  renderDetails() {
    const { screenProps, item } = this.props;

    if (!item) {
      return null;
    }

    const { nickName } = item;
    const key = 'nickName';

    return (
      <ListItem>
        <Body>
          <Grid>
            <Row>
              <Col>
                <Text style={sg.fS14}>Nickname</Text>
                <Text style={[sg.textBold, sg.mT5]}>{nickName}</Text>
              </Col>
              <Col style={[sg.flexNull, sg.jCCenter]}>
                <EditButton
                  style={sg.mR0}
                  onPress={() => {
                    screenProps.navigateTo(routeNames.MANAGE_ACCOUNT_DETAILS_EDIT, {
                      title: 'Account NickName',
                      key,
                      value: nickName,
                      onUpdate: (value) => this.onUpdate(value, key),
                    });
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </Body>
      </ListItem>
    );
  }


  render() {
    return (
      <Content contentContainerStyle={[sg.pT0, sg.flexGrow]} bounces={false}>
        <List>
          <ListItem style={[sg.pT0]} />
          {this.renderDetails()}
        </List>
      </Content>
    );
  }
}

ManageAccountDetails.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  appContentUpdateAccountConnect: PropTypes.func.isRequired,
  accountUpdateSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.navigation.getParam('id');
  const item = getAccountByIdSelector(state, id);

  return {
    id,
    item,
  };
};

const mapDispatchToProps = {
  appContentUpdateAccountConnect: appContentUpdateAccount,
  accountUpdateSaveConnect: accountUpdateSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountDetails);
