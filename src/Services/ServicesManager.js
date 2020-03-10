
import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';

import PushNotificationService from './PushNotificationService';

class ServicesManager extends PureComponent {
  render() {
    return (
      <View>
        <PushNotificationService
          setRef={(c) => {
            if (c) {
              PushNotificationService.PushNotificationServiceInstance = c;
            }
          }}
        />
      </View>
    );
  }
}

export default ServicesManager;
