"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IgApiClient = require('instagram-private-api').IgApiClient;
var IGApp = /** @class */ (function () {
    function IGApp(env) {
        if (env.IG_USERNAME === undefined
            || env.IG_PASSWORD === undefined) {
            console.log('Please provide instagram\'s Username & Password in .env file');
        }
        else {
            this.client = new IgApiClient();
        }
    }
    IGApp.prototype.run = function () {
        console.log('TODO implement');
    };
    return IGApp;
}());
exports.default = IGApp;
