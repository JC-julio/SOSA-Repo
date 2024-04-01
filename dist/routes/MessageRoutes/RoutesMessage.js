"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MessageController_1 = __importDefault(require("../../controllers/Message/MessageController"));
const middlewareDeLogin_1 = require("../../middlewares/middlewareDeLogin");
const router = express_1.default.Router();
router.post('/Message/:idOrganization', middlewareDeLogin_1.loginRequired, MessageController_1.default.post);
router.get('/Message/:idOrganization', middlewareDeLogin_1.loginRequired, MessageController_1.default.GetAll);
router.delete('/Message/:id', middlewareDeLogin_1.loginRequired, MessageController_1.default.delete);
router.put('/Message/:idOrganization/:id', middlewareDeLogin_1.loginRequired, MessageController_1.default.updateAll);
exports.default = router;
//# sourceMappingURL=RoutesMessage.js.map