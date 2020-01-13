
import React, { Component } from 'react';

import {
  View,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import AccountsList from 'src/Components/AccountsList';

class ManageAccounts extends Component {
  onItemPress({ id, nickName }) {
    const { screenProps } = this.props;

    screenProps.navigateTo(routeNames.MANAGE_ACCOUNT_DETAILS, {
      id,
      title: nickName,
    });
  }

  render() {
    return (
      <View bg padder>
        <AccountsList
          onItemPress={(item) => {
            this.onItemPress(item);
          }}
        />
      </View>
    );
  }
}

export default ManageAccounts;
