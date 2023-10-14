import { consoleLogYellow, saveImg } from './_utils';

require('dotenv').config();
import { ETwitterStreamEvent, TweetStream } from 'twitter-api-v2';
const { TwitterApi } = require('twitter-api-v2');

export default class TwitterApp {
  private twitterClient: any;

  constructor() {
    if (
      process.env.TWITTER_CONSUMER_KEY === undefined
      || process.env.TWITTER_CONSUMER_SECRET === undefined
      || process.env.TWITTER_ACCESS_TOKEN_KEY === undefined
      || process.env.TWITTER_ACCESS_TOKEN_SECRET === undefined
    ) {
      console.log('Please provide Twitter\'s Consumer Key, Consumer Secret, Access Token Key & Access Token Secret in .env file')
    } else {
      this.twitterClient = new TwitterApi({
        appKey: process.env.TWITTER_CONSUMER_KEY,
        appSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });
    }
  }

  public run(keyword: string): void {
    console.log('###########################################')
    console.log(`# Looking for "${keyword}" images in tweets `)
    console.log('###########################################')

    this.twitterClient.v1.stream.getStream('statuses/filter.json', {track: keyword})
      .then((stream: TweetStream<any>) => {
        stream.on(ETwitterStreamEvent.Data, (event) => {
          const user_id = event.user.id;
          const user_name = event.user.screen_name;
          console.log('########################################')
          console.log(`New result found for keyword: ${keyword}`)
          console.log(`User ID: ${user_id}`)
          console.log(`User name: @${user_name}`)

          if (event && event.entities && event.entities.media) {
            const media_url = event.entities.media[0].media_url;
            const media_id = event.entities.media[0].id_str;
            consoleLogYellow('One media found 😀')
            consoleLogYellow(`URL: ${media_url}`)

            saveImg(keyword, media_url, media_id, user_name, user_id);
          } else {
            console.log('No media found 🫤')
          }
        })

        stream.on(ETwitterStreamEvent.Error, (error) => {
          console.log(`Error: ${error}`);
        });
      });
  }
}
