"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./_utils");
require('dotenv').config();
var IgApiClient = require('instagram-private-api').IgApiClient;
var IGApp = /** @class */ (function () {
    function IGApp() {
        if (process.env.IG_USERNAME === undefined
            || process.env.IG_PASSWORD === undefined) {
            console.log('Please provide instagram\'s Username & Password in .env file');
        }
        else {
            this.client = new IgApiClient();
            this.username = process.env.IG_USERNAME;
            this.password = process.env.IG_PASSWORD;
        }
    }
    IGApp.prototype.run = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var loggedInUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client.state.generateDevice(this.username);
                        return [4 /*yield*/, this.client.simulate.preLoginFlow()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.account.login(this.username, this.password)];
                    case 2:
                        loggedInUser = _a.sent();
                        setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var tags, posts, _i, posts_1, post, user_id, user_name, candidates, greater, media_url, media_id, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 11, , 12]);
                                        tags = this.client.feed.tags(keyword);
                                        return [4 /*yield*/, tags.items()];
                                    case 1:
                                        posts = _a.sent();
                                        _i = 0, posts_1 = posts;
                                        _a.label = 2;
                                    case 2:
                                        if (!(_i < posts_1.length)) return [3 /*break*/, 10];
                                        post = posts_1[_i];
                                        if (!(undefined !== post)) return [3 /*break*/, 8];
                                        user_id = post.user.id;
                                        user_name = post.user.username;
                                        console.log('########################################');
                                        console.log("New result found for keyword: ".concat(keyword));
                                        console.log("User ID: ".concat(user_id));
                                        console.log("User name: @".concat(user_name));
                                        if (!(undefined !== post.image_versions2)) return [3 /*break*/, 6];
                                        candidates = post.image_versions2.candidates;
                                        greater = this.findGreaterImg(candidates);
                                        media_url = greater.url;
                                        if (!(undefined === post.caption || null === post.caption)) return [3 /*break*/, 3];
                                        (0, _utils_1.consoleLogRed)('No caption found, aborting 🫤');
                                        return [3 /*break*/, 5];
                                    case 3:
                                        media_id = post.caption.media_id;
                                        (0, _utils_1.consoleLogYellow)('One media found 😀');
                                        (0, _utils_1.consoleLogYellow)("URL: ".concat(media_url));
                                        return [4 /*yield*/, (0, _utils_1.saveImg)(keyword, media_url, media_id, user_name, user_id)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        (0, _utils_1.consoleLogYellow)('No image found 🫤');
                                        _a.label = 7;
                                    case 7: return [3 /*break*/, 9];
                                    case 8:
                                        (0, _utils_1.consoleLogYellow)('No post found 🫤');
                                        _a.label = 9;
                                    case 9:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 10: return [3 /*break*/, 12];
                                    case 11:
                                        error_1 = _a.sent();
                                        (0, _utils_1.consoleLogRed)('Error while searching posts 🫤');
                                        console.log(error_1);
                                        return [3 /*break*/, 12];
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); }, 60000);
                        return [2 /*return*/];
                }
            });
        });
    };
    IGApp.prototype.findGreaterImg = function (candidates) {
        var greater = candidates.reduce(function (max, candidate) {
            var candidateSum = candidate.width * candidate.height;
            var maxSum = max.width * max.height;
            if (candidateSum > maxSum) {
                return candidate;
            }
            else {
                return max;
            }
        });
        return greater;
    };
    return IGApp;
}());
exports.default = IGApp;
