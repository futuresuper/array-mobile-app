
export default {
  ID_TYPE: {
    PASSPORT: 'Passport',
    DRIVERS_LICENSE: 'DriversLicense',
    MEDICARE_CARD: 'MedicareCard',
  },

  getTypeName(type) {
    let res = 'Passport';

    switch (type) {
      case this.ID_TYPE.DRIVERS_LICENSE:
        res = 'Drivers License';
        break;
      case this.ID_TYPE.MEDICARE_CARD:
        res = 'Medicare Card';
        break;
      default:
        break;
    }

    return res;
  },
};
