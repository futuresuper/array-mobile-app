export default {
  ID_TYPE: {
    PASSPORT: 'Passport',
    DRIVERS_LICENSE: 'DriversLicence',
    MEDICARE_CARD: 'MedicareCard',
  },

  getTypeName(type) {
    let res = 'Australian Passport';

    switch (type) {
      case this.ID_TYPE.DRIVERS_LICENSE:
        res = 'Drivers Licence';
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
