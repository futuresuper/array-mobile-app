
import Firebase from 'react-native-firebase';

export default class FirebaseService {
  constructor() {
    this.messaging = Firebase.messaging();
    this.notifications = Firebase.notifications();
  }
}
