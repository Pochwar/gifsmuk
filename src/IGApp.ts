import { consoleLogRed, consoleLogYellow, saveImg } from './_utils';
require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');

export default class IGApp {
  private client: any;
  private readonly username!: string;
  private readonly password!: string;

  constructor() {
    if (
      process.env.IG_USERNAME === undefined
      || process.env.IG_PASSWORD === undefined
    ) {
      console.log('Please provide instagram\'s Username & Password in .env file')
    } else {
      this.client = new IgApiClient();
      this.username = process.env.IG_USERNAME;
      this.password = process.env.IG_PASSWORD;
    }
  }

  public async run(keyword: string) {
    this.client.state.generateDevice(this.username);
    await this.client.simulate.preLoginFlow();
    const loggedInUser = await this.client.account.login(this.username, this.password);

    setInterval(async () => {
      try {
        const tags = this.client.feed.tags(keyword);
        const posts = await tags.items();
        for (const post of posts) {
          if (undefined !== post) {
            const user_id = post.user.id;
            const user_name = post.user.username;
            console.log('########################################')
            console.log(`New result found for keyword: ${keyword}`)
            console.log(`User ID: ${user_id}`)
            console.log(`User name: @${user_name}`)
            if (undefined !== post.image_versions2) {
              const candidates = post.image_versions2.candidates
              const greater = this.findGreaterImg(candidates);

              const media_url = greater.url
              if (undefined === post.caption || null === post.caption) {
                consoleLogRed('No caption found, aborting 🫤')
              } else {
                const media_id = post.caption.media_id
                consoleLogYellow('One media found 😀')
                consoleLogYellow(`URL: ${media_url}`)

                await saveImg(keyword, media_url, media_id, user_name, user_id);
              }
            } else {
              consoleLogYellow('No image found 🫤');
            }
          } else {
            consoleLogYellow('No post found 🫤')
          }
        }
      } catch (error) {
        consoleLogRed('Error while searching posts 🫤');
        console.log(error);
      }
    }, 60000)
  }

  private findGreaterImg(candidates: any) {
    const greater = candidates.reduce((max: any, candidate: any) => {
      const candidateSum = candidate.width * candidate.height;
      const maxSum = max.width * max.height;

      if (candidateSum > maxSum) {
        return candidate;
      } else {
        return max;
      }
    })

    return greater;
  }
}
