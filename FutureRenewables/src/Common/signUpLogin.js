
export default {
  ACCOUNT_TYPE: {
    INDIVIDUAL: 'individual',
    FEAT: 'feat',
  },

  getAccountType(navigation) {
    const accountType = navigation.getParam('accountType', this.ACCOUNT_TYPE.INDIVIDUAL);
    const isFeat = (accountType === this.ACCOUNT_TYPE.FEAT);

    return {
      accountType,
      isFeat,
    };
  },
};
