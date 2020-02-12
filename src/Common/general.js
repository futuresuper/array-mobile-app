
import { Config } from 'src/Common/config';

export default {
  isTestNumber(phoneNumber) {
    const { testUser } = Config.get();

    if (!testUser) {
      return null;
    }

    if (
      (testUser.phoneNumber === phoneNumber)
      || (`+${testUser.phoneNumber}` === phoneNumber)
    ) {
      return testUser;
    }

    return null;
  },
};
