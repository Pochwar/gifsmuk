"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var TwitterApp_1 = __importDefault(require("./TwitterApp"));
// @ts-ignore
var IGApp_1 = __importDefault(require("./IGApp"));
// Get keyword from command line
var client = process.argv[2];
var app;
switch (client) {
    case 'instagram':
        app = new IGApp_1.default();
        break;
    case 'twitter':
        app = new TwitterApp_1.default();
        break;
    default:
        console.log('Invalid client');
        break;
}
if (app) {
    // Get keyword from command line
    var keyword = process.argv[3];
    // Send error message if keyword is undefined
    if (keyword === undefined) {
        console.log('Please provide a search keyword. Use the command "npm start <client> <keyword>"');
    }
    else {
        app.run(keyword);
    }
}
