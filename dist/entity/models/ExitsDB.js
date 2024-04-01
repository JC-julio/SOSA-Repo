"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExistsSchema = new mongoose_1.default.Schema({
    idStudent: String,
    idWorker: String,
    organizationId: String,
    time: Number,
    observes: String,
    dateExit: Date,
    confirmExit: String,
});
exports.ExitsModel = mongoose_1.default.model('Exits', ExistsSchema);
//# sourceMappingURL=ExitsDB.js.map