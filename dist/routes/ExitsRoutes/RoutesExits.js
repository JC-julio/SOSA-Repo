"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExitsController_1 = __importDefault(require("../../controllers/Exits/ExitsController"));
const middlewareDeLogin_1 = require("../../middlewares/middlewareDeLogin");
const router = express_1.default.Router();
router.post('/Exits/:idOrganization', middlewareDeLogin_1.loginRequired, ExitsController_1.default.Post);
router.get('/Exits/:idOrganization/:id', middlewareDeLogin_1.loginRequired, ExitsController_1.default.GetOne);
router.get('/Exits/:idOrganization/:dateInit/:dateEnd', middlewareDeLogin_1.loginRequired, ExitsController_1.default.GetExits);
router.get('/Exits/:idOrganization', middlewareDeLogin_1.loginRequired, ExitsController_1.default.GetAll);
router.delete('/Exits/:idOrganization', middlewareDeLogin_1.loginRequired, ExitsController_1.default.DeleteAll);
router.put('/Exits/:idOrganization/:id', middlewareDeLogin_1.loginRequired, ExitsController_1.default.Update);
exports.default = router;
//# sourceMappingURL=RoutesExits.js.map