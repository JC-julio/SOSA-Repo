"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ManagerController_1 = __importDefault(require("../../controllers/Admin/ManagerController"));
const middlewareDeLogin_1 = require("../../middlewares/middlewareDeLogin");
const router = express_1.default.Router();
router.post('/Admin/:idOrganization', middlewareDeLogin_1.loginRequired, ManagerController_1.default.Post);
router.get('/Admin/:idOrganization', middlewareDeLogin_1.loginRequired, ManagerController_1.default.GetAll);
router.get('/Admin/:idOrganization/:id', middlewareDeLogin_1.loginRequired, ManagerController_1.default.GetOne);
router.delete('/Admin/:idOrganization/:id', middlewareDeLogin_1.loginRequired, ManagerController_1.default.Delete);
router.put('/Admin/:idOrganization/:id', middlewareDeLogin_1.loginRequired, ManagerController_1.default.Update);
router.post('/Admin', ManagerController_1.default.Login);
router.post('/Admin/Logout/:token', middlewareDeLogin_1.loginRequired, ManagerController_1.default.Logout);
exports.default = router;
//# sourceMappingURL=RoutesManager.js.map