"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
var kanji_1 = require("./kanji");
var user_1 = require("./user");
exports.Mutation = __assign(__assign({}, user_1.userResolvers), kanji_1.KanjiResolvers);
