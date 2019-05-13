
import Amplify, { Auth } from 'aws-amplify';
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

  // eslint-disable-next-line class-methods-use-this
  init() {
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
  }

  async signIn(phoneNumber) {
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

  async answerCustomChallenge(phoneNumber, answer) {
    this.cognitoUser = await Auth.sendCustomChallengeAnswer(
      phoneNumber,
      `${answer}`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomString(bytes) {
    const randomValues = new Uint8Array(bytes);
    // eslint-disable-next-line no-undef
    window.crypto.getRandomValues(randomValues);

    return Array.from(randomValues)
      .map(this.intToHex)
      .join('');
  }

  // eslint-disable-next-line class-methods-use-this
  intToHex(nr) {
    return nr.toString(16).padStart(2, '0');
  }
}

const awsAmplify = new AwsAmplify();

export default awsAmplify;
