import fs from 'fs';
const mkdirp = require('mkdirp');
import download, { DownloadResult } from 'image-downloader';

const consoleLogGreen = function(s: string) {
  console.log('\x1b[32m', s, '\x1b[0m')
};

const consoleLogRed = function(s: string) {
  console.log('\x1b[31m', s, '\x1b[0m')
};

const consoleLogYellow = function(s: string) {
  console.log('\x1b[33m', s, '\x1b[0m')
};

const isNew = function(media_id: string, path: string): boolean {
  let isNew = true;
  fs.readdirSync(path).forEach((file: string) => {
    const pattern = new RegExp(/([0-9]*)(-@)(.*)/gm)
    const res = pattern.exec(file)
    if (res && res[1] === media_id) {
      isNew = false;
    }
  })

  return isNew;
}

const saveImg = async function(keyword: string, media_url: string, media_id: string, user_name: string, user_id: string): Promise<void>
{
  // Set subfolder path where to save images
  const path = `downloaded_images/${keyword}`;

  // Create subfolder if not exist
  await mkdirp(`${__dirname}/../${path}`, async (err: Error) => {
    if (err) {
      console.error(err)
    } else {
      // Set download options
      const options = {
        url: media_url,
        dest: `${__dirname}/../${path}/${media_id}-@${user_name}-(id:${user_id}).jpg`,
      };

      // Save image if new
      if (isNew(media_id, path)) {
        await download.image(options)
          .then((result: DownloadResult) => {
            consoleLogGreen(`File saved to: ${result.filename}`)
          })
          .catch((err: Error) => {
            console.error(err)
          })
      } else {
        consoleLogRed("File already exists, download aborted")
      }
    }
  })
}

export {
  consoleLogGreen,
  consoleLogRed,
  consoleLogYellow,
  saveImg,
}
