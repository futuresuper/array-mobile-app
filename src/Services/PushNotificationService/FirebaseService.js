
import Firebase from 'react-native-firebase';

export default class FirebaseService {
  constructor(options) {
    const {
      onFirebaseInit = () => null,
      updateToken = () => null,
      onNotificationOpened = () => null,
      onPermissionEnabled = () => null,
    } = options;

    this.messaging = Firebase.messaging();
    this.notifications = Firebase.notifications();
    this.callbacks = {
      onFirebaseInit,
      updateToken,
      onNotificationOpened,
      onPermissionEnabled,
    };

    this.initFirebase();
  }

  initFirebase() {
    this.messaging.getToken()
      .then((token) => this.onTokenReceived(token))
      .catch(() => {
        // No firebase token received
      });

    this.messaging.hasPermission().then((enabled) => {
      if (enabled) {
        this.callbacks.onPermissionEnabled();
      } else {
        this.messaging.requestPermission()
          .then(() => {
            this.callbacks.onPermissionEnabled();
          })
          .catch(() => {
            // User has rejected permissions
          });
      }
    });
  }

  onTokenReceived(token) {
    try {
      this.callbacks.onFirebaseInit(token);
      this.attachListeners();

      this.notifications.getInitialNotification().then(() => {
      }).catch(() => {
        // empty
      });
    } catch (e) {
      // empty
    }
  }

  attachListeners() {
  }

  removeListeners() {
  }
}
