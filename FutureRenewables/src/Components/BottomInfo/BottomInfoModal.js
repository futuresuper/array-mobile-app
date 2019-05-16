
import React, { Component } from 'react';

import ModalBottomInfo from './ModalBottomInfo';
import AccountsInfo from './AccountsInfo/AccountsInfo';
import FutureSuperAccountInfo from './FutureSuperAccountInfo/FutureSuperAccountInfo';

class BottomInfoModal extends Component {
  static show(...args) {
    BottomInfoModal.ModalBottomInfo.show(...args);
  }

  static showAccounts(props) {
    BottomInfoModal.show(<AccountsInfo {...props} />);
  }

  static showFutureSuperAccount() {
    BottomInfoModal.show(<FutureSuperAccountInfo />);
  }

  static hide() {
    BottomInfoModal.ModalBottomInfo.hide();
  }

  render() {
    return (
      <ModalBottomInfo
        ref={(ref) => {
          if (ref) {
            BottomInfoModal.ModalBottomInfo = ref;
          }
        }}
      />
    );
  }
}

export default BottomInfoModal;
