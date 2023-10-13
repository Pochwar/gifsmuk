const { IgApiClient } = require('instagram-private-api');

export default class IGApp {
  private client: any;

  constructor(env: any) {
    if (
      env.IG_USERNAME === undefined
      || env.IG_PASSWORD === undefined
    ) {
      console.log('Please provide instagram\'s Username & Password in .env file')
    } else {
      this.client = new IgApiClient();
    }
  }

  public run() {
    console.log('TODO implement')
  }
}
