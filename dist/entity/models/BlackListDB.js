"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TokenSchema = new mongoose_1.default.Schema({
    bannedToken: String,
});
exports.TokenModel = mongoose_1.default.model('BlackList', TokenSchema);
//# sourceMappingURL=BlackListDB.js.map