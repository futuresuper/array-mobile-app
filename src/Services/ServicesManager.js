
import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';

import PushNotificationService from './PushNotificationService';

class ServicesManager extends PureComponent {
  render() {
    return (
      <View>
        <PushNotificationService />
      </View>
    );
  }
}

export default ServicesManager;
