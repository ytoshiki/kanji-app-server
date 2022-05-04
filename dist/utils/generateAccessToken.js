"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateAccessToken = function (userId) {
    return jsonwebtoken_1.default.sign(userId, process.env.JWT_SECRET, {});
};
exports.generateAccessToken = generateAccessToken;
