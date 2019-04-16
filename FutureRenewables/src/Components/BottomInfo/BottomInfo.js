
import React, { Component } from 'react';

import ModalBottomInfo from './ModalBottomInfo';
import AccountsInfo from './AccountsInfo/AccountsInfo';

class BottomInfo extends Component {
  static show(...args) {
    BottomInfo.ModalBottomInfo.show(...args);
  }

  static showAccouts() {
    BottomInfo.show(<AccountsInfo />);
  }

  static hide() {
    BottomInfo.ModalBottomInfo.hide();
  }

  render() {
    return (
      <ModalBottomInfo
        ref={(ref) => {
          if (ref) {
            BottomInfo.ModalBottomInfo = ref;
          }
        }}
      />
    );
  }
}

export default BottomInfo;
