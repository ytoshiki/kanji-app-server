"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kanji = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var KanjiSchema = new mongoose_1.default.Schema({
    character: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["low", "middle", "high"],
        default: "middle"
    }
}, {
    timestamps: true
});
exports.Kanji = mongoose_1.default.model('Kanji', KanjiSchema);
