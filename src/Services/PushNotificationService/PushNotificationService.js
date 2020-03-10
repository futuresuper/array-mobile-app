
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Toast from 'src/Components/Toast';

import {
  userAllowPushNotifications,
} from 'src/Redux/Auth';

import FirebaseService from './FirebaseService';

class PushNotificationService extends Component {
  static PushNotificationServiceInstance;

  static init() {
    this.PushNotificationServiceInstance.initProc(false);
  }

  constructor(props) {
    super(props);

    this.notificationClickActions = {
    };
  }

  componentDidMount() {
    const { setRef } = this.props;
    setRef(this);

    this.initProc();
  }

  componentDidUpdate({ user: userPrev }) {
    const { user } = this.props;

    if (user !== userPrev) {
      const userId = _.get(user, 'id');
      const userIdPrev = _.get(userPrev, 'id');

      if (
        userId
        && (userId !== userIdPrev)
      ) {
        this.initProc();
      }
    }
  }

  componentWillUnmount() {
    const { setRef } = this.props;
    setRef(null);

    if (this.firebase) {
      this.firebase.removeListeners();
    }
  }

  onNotificationOpened = (notif) => {
    if (!notif) {
      return;
    }

    const clickAction = this.notificationClickActions[notif.click_action];

    if (clickAction) {
      clickAction(notif);
    }
  }

  onPermissionEnabled = () => {
    const { userAllowPushNotificationsConnect } = this.props;
    userAllowPushNotificationsConnect();

    Toast.show("Done! You'll now get push notifications");
  }

  updateToken = (token, isRefreshed = false) => {
    const { fcmToken: currentToken } = this.props;
  }

  initProc(checkAllowPushNotification = true) {
    const { user } = this.props;
    const isAuth = (user && !_.isEmpty(user)) && user.email && user.firstName && user.lastName;

    if (!isAuth) {
      return;
    }

    if (
      checkAllowPushNotification
      && !user.allowPushNotifications
    ) {
      return;
    }

    const firebaseCallbacks = {
      onFirebaseInit: this.updateToken,
      updateToken: (token) => this.updateToken(token, true),
      onNotificationOpened: this.onNotificationOpened,
    };

    if (!checkAllowPushNotification) {
      firebaseCallbacks.onPermissionEnabled = this.onPermissionEnabled;
    }

    this.firebase = new FirebaseService(firebaseCallbacks);
  }

  render() {
    return null;
  }
}

PushNotificationService.defaultProps = {
  setRef: () => null,
  fcmToken: null,
  user: null,
};

PushNotificationService.propTypes = {
  setRef: PropTypes.func,
  fcmToken: PropTypes.string,
  user: PropTypes.object,
  userAllowPushNotificationsConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  setRef: ownProps.setRef,
  fcmToken: 'asd',
  user: state.auth.user,
});

const mapDispatchToProps = {
  userAllowPushNotificationsConnect: userAllowPushNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushNotificationService);
