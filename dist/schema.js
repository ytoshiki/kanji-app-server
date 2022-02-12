"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    user: User\n  }\n\n  type Mutation {\n    signup(credentials: AuthInput): AuthPayload!\n    signin(credentials: AuthInput): AuthPayload!\n  }\n\n  type User {\n    id: ID!\n    username: String!\n    avatar: String\n    list: [Kanji]!\n  }\n\n  type Kanji {\n    id: ID!\n    character: String!\n    status: String!\n    createdAt: String!\n  }\n\n  type UserError {\n    message: String!\n  }\n\n  type AuthPayload {\n    userErrors: [UserError!]!\n    token: String\n  }\n\n  input AuthInput {\n    username: String!\n    password: String!\n  }\n\n"], ["\n  type Query {\n    user: User\n  }\n\n  type Mutation {\n    signup(credentials: AuthInput): AuthPayload!\n    signin(credentials: AuthInput): AuthPayload!\n  }\n\n  type User {\n    id: ID!\n    username: String!\n    avatar: String\n    list: [Kanji]!\n  }\n\n  type Kanji {\n    id: ID!\n    character: String!\n    status: String!\n    createdAt: String!\n  }\n\n  type UserError {\n    message: String!\n  }\n\n  type AuthPayload {\n    userErrors: [UserError!]!\n    token: String\n  }\n\n  input AuthInput {\n    username: String!\n    password: String!\n  }\n\n"])));
var templateObject_1;
