
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FirebaseService from './FirebaseService';

class PushNotificationService extends Component {
  constructor(props) {
    super(props);

    this.notificationClickActions = {
    };
  }

  componentDidMount() {
    this.firebase = new FirebaseService();
  }

  render() {
    return null;
  }
}

export default connect()(PushNotificationService);
