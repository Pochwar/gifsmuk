import fs from 'fs';
import download, { DownloadResult } from 'image-downloader';
require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const mkdirp = require('mkdirp');

export default class IGApp {
  private client: any;
  private username!: string;
  private password!: string;
  private path!: string;

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

  private setPath(path: string): void {
    this.path = path;
  }

  public async run(keyword: string) {
    this.setPath(`downloaded_images/${keyword}`);
    this.client.state.generateDevice(this.username);
    await this.client.simulate.preLoginFlow();
    const loggedInUser = await this.client.account.login(this.username, this.password);

    const tags = this.client.feed.tags(keyword);
    const posts = await tags.items();
    posts.forEach((post: any) => {
      if (undefined !== post) {
        if (undefined !== post.image_versions2) {
          const user_id = post.user.id;
          const user_name = post.user.username;
          console.log('########################################')
          console.log(`New result found for keyword: ${keyword}`)
          console.log(`User ID: ${user_id}`)
          console.log(`User name: @${user_name}`)
          const candidates = post.image_versions2.candidates
          const greater = this.findGreaterImg(candidates);

          const media_url = greater.url
          const media_id = post.caption.media_id

          // Set subfolder path where to save images
          const path = `downloaded_images/${keyword}`;

          // Create subfolder if not exist
          mkdirp(`${__dirname}/../${path}`, (err: Error) => {
            if (err) {
              console.error(err)
            } else {
              // Set download options
              const options = {
                url: media_url,
                dest: `${__dirname}/../${path}/${media_id}-@${user_name}-(id:${user_id}).jpg`,
              };

              // Save image if new
              if (this.isNew(media_id)) {
                download.image(options)
                  .then((result: DownloadResult) => {
                    this.consoleLogGreen(`File saved to: ${result.filename}`)
                  })
                  .catch((err: Error) => {
                    console.error(err)
                  })
              } else {
                this.consoleLogRed("File already exists, download aborted")
              }
            }
          })

        } else {
          console.log('No image found')
        }
      } else {
        console.log('No post found')
      }
    })
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

  private isNew(media_id: string): boolean {
    let isNew = true;
    fs.readdirSync(this.path).forEach((file: string) => {
      const pattern = new RegExp(/([0-9]*)(-@)(.*)/gm)
      const res = pattern.exec(file)
      if (res && res[1] === media_id) {
        isNew = false;
      }
    })

    return isNew;
  }

  private consoleLogGreen = function(s: string) {
    console.log('\x1b[32m', s, '\x1b[0m')
  };

  private consoleLogRed = function(s: string) {
    console.log('\x1b[31m', s, '\x1b[0m')
  };

  private consoleLogYellow = function(s: string) {
    console.log('\x1b[33m', s, '\x1b[0m')
  };
}
