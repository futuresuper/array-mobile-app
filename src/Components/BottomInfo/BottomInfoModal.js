
import React, { Component } from 'react';

import ModalBottomInfo from './ModalBottomInfo';
import AccountsInfo from './AccountsInfo/AccountsInfo';
import FutureSuperAccountInfo from './FutureSuperAccountInfo/FutureSuperAccountInfo';
import WithdrawInfo from './WithdrawInfo/WithdrawInfo';
import BalanceInfo from './BalanceInfo/BalanceInfo';
import AboutReturn from './AboutReturn/AboutReturn';

class BottomInfoModal extends Component {
  static show(...args) {
    BottomInfoModal.ModalBottomInfo.show(...args);
  }

  static showAccounts(props) {
    BottomInfoModal.show(AccountsInfo, props);
  }

  static showFutureSuperAccount() {
    BottomInfoModal.show(FutureSuperAccountInfo);
  }

  static showWithdraw() {
    BottomInfoModal.show(<WithdrawInfo />);
  }

  static showBalance() {
    BottomInfoModal.show(BalanceInfo);
  }

  static showAboutReturn() {
    BottomInfoModal.show(AboutReturn);
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
        {...this.props}
      />
    );
  }
}

export default BottomInfoModal;
