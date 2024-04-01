"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    value: String,
    idManager: String,
    exibDate: (Array),
    organizationId: String,
});
exports.messageModel = mongoose_1.default.model('message', messageSchema);
//# sourceMappingURL=MessageDB.js.map