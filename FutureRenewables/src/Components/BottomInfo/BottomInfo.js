
import React, { Component } from 'react';

import ModalBottomInfo from './ModalBottomInfo';
import AccountsInfo from './AccountsInfo/AccountsInfo';
import FutureSuperAccountInfo from './FutureSuperAccountInfo/FutureSuperAccountInfo';

class BottomInfo extends Component {
  static show(...args) {
    BottomInfo.ModalBottomInfo.show(...args);
  }

  static showAccounts(props) {
    BottomInfo.show(<AccountsInfo {...props} />);
  }

  static showFutureSuperAccount() {
    BottomInfo.show(<FutureSuperAccountInfo />);
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
