# GIFSMUK
Get Images From Social Medias Using Keyword

## WIP
`node src.run.js` to retrieve images from IG
### TODO

- [ ] put `src/run.js` logic in IGApp.ts
- [ ] save images
- [ ] make whole script run by fixing TS errors

## Description
This project is born after my other project [GIFTUH](https://github.com/Pochwar/giftuh) that retrieved images from Twitter only is no longer working.

So I decided to make another one that could do the same thing from other Social Medias, like Instagram.

So, the purpose of this project is to retrieve images from posts that contains a specific keyword or hashtag. Images will be downloaded into the `downloaded_images` folder.


# Prerequires

- NodeJs
- NPM

## Installation, configuration & usage

- Clone project: `git clone https://github.com/Pochwar/giftuh.git`
- Go inside project: `cd GIFTUH`
- Install dependencies: `npm install`
- Copy `.env.example` file in `.env` file: `cp .env.example .env`
- Set your Twitter's Consumer Key, Consumer Secret, Access Token Key & Access Token Secret in the `.env` file (To create some, go to: https://developer.twitter.com/. You need to have a Twitter account)
- Run the script: `npm start keyword` where "keyword" is the searched term
- Watch the magic happend and get the retrieved images in a specific subfolder of `downloaded_images` folder.

## Development
Use `npm run start:dev` to start nodemon and reload automatically.

Build with `npm run build`
