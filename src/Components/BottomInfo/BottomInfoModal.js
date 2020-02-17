
import React, { Component } from 'react';

import ModalBottomInfo from './ModalBottomInfo';
import AccountsInfo from './AccountsInfo/AccountsInfo';
import FutureSuperAccountInfo from './FutureSuperAccountInfo/FutureSuperAccountInfo';
import WithdrawInfo from './WithdrawInfo/WithdrawInfo';
import BalanceInfo from './BalanceInfo/BalanceInfo';
import AboutReturn from './AboutReturn/AboutReturn';
import StatusInfo from './StatusInfo/StatusInfo';


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

  static showBalance(...props) {
    BottomInfoModal.show(BalanceInfo, ...props);
  }

  static showAboutReturn() {
    BottomInfoModal.show(AboutReturn);
  }

  static showStatusInfo() {
    BottomInfoModal.show(StatusInfo);
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
