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
exports.KanjiResolvers = void 0;
var kanji_1 = __importDefault(require("../../models/kanji"));
var user_1 = __importDefault(require("../../models/user"));
exports.KanjiResolvers = {
    kanjiCreate: function (_, _a, _b) {
        var input = _a.input;
        var userInfo = _b.userInfo;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, character, kanjiAlreadyListed, kanji, newKanji, user, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!userInfo) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Token is either missing or invalid",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        id = userInfo.id;
                        character = input.character;
                        if (!character) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "character is missing",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        return [4, kanji_1.default.findOne({ character: character, user: id })];
                    case 2:
                        kanjiAlreadyListed = _c.sent();
                        if (kanjiAlreadyListed) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "".concat(character, " is already in your list"),
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        kanji = new kanji_1.default({ character: character, user: id });
                        return [4, kanji.save()];
                    case 3:
                        newKanji = _c.sent();
                        if (!newKanji) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Failed to create kanji",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        return [4, user_1.default.findByIdAndUpdate(id, {
                                $push: {
                                    list: newKanji._id,
                                },
                            }, { new: true }).populate("list")];
                    case 4:
                        user = _c.sent();
                        if (!user) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Faied to update user's list",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        return [2, {
                                kanjiErrors: [],
                                kanji: newKanji,
                            }];
                    case 5:
                        error_1 = _c.sent();
                        console.log(error_1);
                        return [2, {
                                kanjiErrors: [
                                    {
                                        message: "Something went wrong",
                                    },
                                ],
                                kanji: null,
                            }];
                    case 6: return [2];
                }
            });
        });
    },
    kanjiStatusUpdate: function (_, _a, _b) {
        var input = _a.input;
        var userInfo = _b.userInfo;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, character, status, validStatus, kanjiFilter, kanjiUpdate, kanji, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!userInfo) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Token is either missing or invalid",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        id = userInfo.id;
                        character = input.character, status = input.status;
                        if (!character || !status) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Either character or status is missing",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        validStatus = ["low", "middle", "high"];
                        if (!validStatus.includes(status)) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "".concat(status, " is an invalid status"),
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        kanjiFilter = {
                            character: character,
                            user: id,
                        };
                        kanjiUpdate = {
                            status: status,
                        };
                        return [4, kanji_1.default.findOneAndUpdate(kanjiFilter, kanjiUpdate, {
                                new: true,
                            })];
                    case 2:
                        kanji = _c.sent();
                        if (!kanji) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "".concat(character, " is not found in your list"),
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        return [2, {
                                kanjiErrors: [],
                                kanji: kanji,
                            }];
                    case 3:
                        error_2 = _c.sent();
                        return [2, {
                                kanjiErrors: [
                                    {
                                        message: "Something went wrong",
                                    },
                                ],
                                kanji: null,
                            }];
                    case 4: return [2];
                }
            });
        });
    },
    kanjiDelete: function (_, _a, _b) {
        var input = _a.input;
        var userInfo = _b.userInfo;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, character, kanjiFilter, kanji, user, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!userInfo) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Token is either missing or invalid",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        id = userInfo.id;
                        character = input.character;
                        if (!character) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Character is missing",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        kanjiFilter = {
                            character: character,
                            user: id,
                        };
                        return [4, kanji_1.default.findOneAndDelete(kanjiFilter)];
                    case 2:
                        kanji = _c.sent();
                        if (!kanji) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "".concat(character, " is not found in your list"),
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        return [4, user_1.default.findByIdAndUpdate(id, { $pull: { list: { $in: kanji._id } } }, {
                                new: true,
                            })];
                    case 3:
                        user = _c.sent();
                        if (!user) {
                            return [2, {
                                    kanjiErrors: [
                                        {
                                            message: "Failed to delete kanji from list",
                                        },
                                    ],
                                    kanji: null,
                                }];
                        }
                        return [2, {
                                kanjiErrors: [],
                                kanji: kanji,
                            }];
                    case 4:
                        error_3 = _c.sent();
                        return [2, {
                                kanjiErrors: [
                                    {
                                        message: "Something went wrong",
                                    },
                                ],
                                kanji: null,
                            }];
                    case 5: return [2];
                }
            });
        });
    },
};