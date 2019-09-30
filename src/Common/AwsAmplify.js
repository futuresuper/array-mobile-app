import Amplify, { Auth } from 'aws-amplify';
import { random } from 'lodash';

import { Config } from 'src/Common/config';

class AwsAmplify {
  constructor() {
    this.init = this.init.bind(this);

    if (!AwsAmplify.instance) {
      this.init();
      AwsAmplify.instance = this;
    }

    return AwsAmplify.instance;
  }

  async init() {
    this.cognitoUser = undefined;
    const config = Config.get();

    Amplify.configure({
      Auth: {
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
      },
      API: {
        endpoints: [
          {
            name: 'array',
            endpoint: config.apiGateway.URL,
            region: config.apiGateway.REGION,
          },
        ],
      },
    });

    // this.logOut();
  }

  async logOut() {
    const conf = Auth.configure();
    const currentUser = Auth.userPool.getCurrentUser();
    try {
      const session = await Auth.currentSession();
      console.log('!!!', { session });
    } catch {
      // empty
    }
    console.log('!!!', { conf });
    console.log('!!!', { currentUser });

    if (currentUser) {
      await currentUser.signOut();
    }

    try {
      await Auth.signOut({ global: true });
    } catch (e) {
      // empty
      console.warn('Auth.signOut:', e);
    }
  }

  async signIn(phoneNumber) {
    this.isAuthenticated();
    this.cognitoUser = await Auth.signIn(phoneNumber);
  }

  async signUp(phoneNumber, fullName) {
    const params = {
      username: phoneNumber,
      password: this.getRandomString(30),
      attributes: {
        name: fullName,
        phone_number: phoneNumber,
      },
    };

    await Auth.signUp(params);
  }

  async answerCustomChallenge(answer) {
    this.cognitoUser = await Auth.sendCustomChallengeAnswer(this.cognitoUser, `${answer}`);

    const isAuthenticated = await this.isAuthenticated();

    if (isAuthenticated) {
      return this.cognitoUser;
    }

    return null;
  }

  async isAuthenticated() {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (err) {
      return false;
    }
  }

  getRandomString(bytes) {
    let randomValues = new Uint8Array(bytes);
    console.log('----------randomValues', randomValues);
    randomValues = randomValues.map(() => random(1, 999));
    return Array.from(randomValues)
      .map(this.intToHex)
      .join('');
  }

  intToHex(nr) {
    return nr.toString(16).padStart(2, '0');
  }
}

const awsAmplify = new AwsAmplify();

export default awsAmplify;
