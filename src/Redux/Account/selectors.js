/* eslint-disable import/prefer-default-export */
export const accountSelector = (state) => state.account.selectedAccount;
export const accountIdSelector = (state) => {
  const { selectedAccount } = state.account;
  if (selectedAccount.id) {
    return selectedAccount.id;
  }
  if (selectedAccount.PK2) {
    return selectedAccount.PK2;
  }
  return null;
};
