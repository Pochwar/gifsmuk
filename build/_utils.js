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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImg = exports.consoleLogYellow = exports.consoleLogRed = exports.consoleLogGreen = void 0;
var fs_1 = __importDefault(require("fs"));
var mkdirp = require('mkdirp');
var image_downloader_1 = __importDefault(require("image-downloader"));
var consoleLogGreen = function (s) {
    console.log('\x1b[32m', s, '\x1b[0m');
};
exports.consoleLogGreen = consoleLogGreen;
var consoleLogRed = function (s) {
    console.log('\x1b[31m', s, '\x1b[0m');
};
exports.consoleLogRed = consoleLogRed;
var consoleLogYellow = function (s) {
    console.log('\x1b[33m', s, '\x1b[0m');
};
exports.consoleLogYellow = consoleLogYellow;
var isNew = function (media_id, path) {
    var isNew = true;
    fs_1.default.readdirSync(path).forEach(function (file) {
        var pattern = new RegExp(/([0-9]*)(-@)(.*)/gm);
        var res = pattern.exec(file);
        if (res && res[1] === media_id) {
            isNew = false;
        }
    });
    return isNew;
};
var saveImg = function (keyword, media_url, media_id, user_name, user_id) {
    return __awaiter(this, void 0, void 0, function () {
        var path;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = "downloaded_images/".concat(keyword);
                    // Create subfolder if not exist
                    return [4 /*yield*/, mkdirp("".concat(__dirname, "/../").concat(path), function (err) { return __awaiter(_this, void 0, void 0, function () {
                            var options;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 1];
                                        console.error(err);
                                        return [3 /*break*/, 4];
                                    case 1:
                                        options = {
                                            url: media_url,
                                            dest: "".concat(__dirname, "/../").concat(path, "/").concat(media_id, "-@").concat(user_name, "-(id:").concat(user_id, ").jpg"),
                                        };
                                        if (!isNew(media_id, path)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, image_downloader_1.default.image(options)
                                                .then(function (result) {
                                                consoleLogGreen("File saved to: ".concat(result.filename));
                                            })
                                                .catch(function (err) {
                                                console.error(err);
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        consoleLogRed("File already exists, download aborted");
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // Create subfolder if not exist
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.saveImg = saveImg;
