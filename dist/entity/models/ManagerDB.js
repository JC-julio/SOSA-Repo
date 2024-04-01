"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ManagerSchema = new mongoose_1.default.Schema({
    name: { type: String },
    password: { type: String },
    type: { type: String },
    organizationId: { type: String },
});
exports.ManagerModel = mongoose_1.default.model('manager', ManagerSchema);
//# sourceMappingURL=ManagerDB.js.map