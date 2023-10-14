"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./_utils");
require('dotenv').config();
var twitter_api_v2_1 = require("twitter-api-v2");
var TwitterApi = require('twitter-api-v2').TwitterApi;
var TwitterApp = /** @class */ (function () {
    function TwitterApp() {
        if (process.env.TWITTER_CONSUMER_KEY === undefined
            || process.env.TWITTER_CONSUMER_SECRET === undefined
            || process.env.TWITTER_ACCESS_TOKEN_KEY === undefined
            || process.env.TWITTER_ACCESS_TOKEN_SECRET === undefined) {
            console.log('Please provide Twitter\'s Consumer Key, Consumer Secret, Access Token Key & Access Token Secret in .env file');
        }
        else {
            this.twitterClient = new TwitterApi({
                appKey: process.env.TWITTER_CONSUMER_KEY,
                appSecret: process.env.TWITTER_CONSUMER_SECRET,
                accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
                accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
            });
        }
    }
    TwitterApp.prototype.run = function (keyword) {
        console.log('###########################################');
        console.log("# Looking for \"".concat(keyword, "\" images in tweets "));
        console.log('###########################################');
        this.twitterClient.v1.stream.getStream('statuses/filter.json', { track: keyword })
            .then(function (stream) {
            stream.on(twitter_api_v2_1.ETwitterStreamEvent.Data, function (event) {
                var user_id = event.user.id;
                var user_name = event.user.screen_name;
                console.log('########################################');
                console.log("New result found for keyword: ".concat(keyword));
                console.log("User ID: ".concat(user_id));
                console.log("User name: @".concat(user_name));
                if (event && event.entities && event.entities.media) {
                    var media_url = event.entities.media[0].media_url;
                    var media_id = event.entities.media[0].id_str;
                    (0, _utils_1.consoleLogYellow)('One media found 😀');
                    (0, _utils_1.consoleLogYellow)("URL: ".concat(media_url));
                    (0, _utils_1.saveImg)(keyword, media_url, media_id, user_name, user_id);
                }
                else {
                    console.log('No media found 🫤');
                }
            });
            stream.on(twitter_api_v2_1.ETwitterStreamEvent.Error, function (error) {
                console.log("Error: ".concat(error));
            });
        });
    };
    return TwitterApp;
}());
exports.default = TwitterApp;
