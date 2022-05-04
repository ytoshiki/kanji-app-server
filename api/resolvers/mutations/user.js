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
exports.userResolvers = void 0;
var user_1 = __importDefault(require("../../models/user"));
var generateAccessToken_1 = require("../../utils/generateAccessToken");
exports.userResolvers = {
    signup: function (_, _a, _b) {
        var credentials = _a.credentials;
        return __awaiter(void 0, void 0, void 0, function () {
            var username, password, user, newUser, token, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        username = credentials.username, password = credentials.password;
                        if (!username || !password) {
                            return [2, {
                                    userErrors: [
                                        {
                                            message: "Username and password are required",
                                        },
                                    ],
                                    token: null,
                                    username: null,
                                    avatar: null,
                                    id: null,
                                }];
                        }
                        if (password.length < 6) {
                            return [2, {
                                    userErrors: [
                                        {
                                            message: "Password is too short. At least 6 charateres are required",
                                        },
                                    ],
                                    token: null,
                                    username: null,
                                    avatar: null,
                                    id: null,
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        user = new user_1.default(credentials);
                        return [4, user.save()];
                    case 2:
                        newUser = _c.sent();
                        token = (0, generateAccessToken_1.generateAccessToken)({ id: newUser._id.toString() });
                        return [2, {
                                userErrors: [],
                                token: token,
                                username: newUser.username,
                                avatar: newUser.avatar,
                                id: newUser._id.toString(),
                            }];
                    case 3:
                        error_1 = _c.sent();
                        return [2, {
                                userErrors: [
                                    {
                                        message: "Username is already taken.",
                                    },
                                ],
                                token: "",
                                username: null,
                                avatar: null,
                                id: null,
                            }];
                    case 4: return [2];
                }
            });
        });
    },
    signin: function (_, _a, _b) {
        var credentials = _a.credentials;
        return __awaiter(void 0, void 0, void 0, function () {
            var username, password, user, userVerified, token, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        username = credentials.username, password = credentials.password;
                        if (!username || !password) {
                            return [2, {
                                    userErrors: [
                                        {
                                            message: "Username and password are required",
                                        },
                                    ],
                                    token: null,
                                    username: null,
                                    avatar: null,
                                    id: null,
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4, user_1.default.findOne({ username: username })];
                    case 2:
                        user = _c.sent();
                        if (!user) {
                            return [2, {
                                    userErrors: [
                                        {
                                            message: "Either username or password is wrong.",
                                        },
                                    ],
                                    token: null,
                                    username: null,
                                    avatar: null,
                                    id: null,
                                }];
                        }
                        return [4, user.verifyPassword(password)];
                    case 3:
                        userVerified = _c.sent();
                        if (!userVerified) {
                            return [2, {
                                    userErrors: [
                                        {
                                            message: "Username and Password don't match",
                                        },
                                    ],
                                    token: null,
                                    username: null,
                                    avatar: null,
                                    id: null,
                                }];
                        }
                        token = (0, generateAccessToken_1.generateAccessToken)({ id: user._id.toString() });
                        return [2, {
                                userErrors: [],
                                token: token,
                                username: user.username,
                                avatar: user.avatar,
                                id: user._id.toString(),
                            }];
                    case 4:
                        error_2 = _c.sent();
                        return [2, {
                                userErrors: [
                                    {
                                        message: "Something went wrong",
                                    },
                                ],
                                token: null,
                                username: null,
                                avatar: null,
                                id: null,
                            }];
                    case 5: return [2];
                }
            });
        });
    },
};
