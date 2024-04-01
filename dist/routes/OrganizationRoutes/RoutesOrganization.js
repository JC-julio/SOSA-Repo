"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrganizationController_1 = __importDefault(require("../../controllers/Organization/OrganizationController"));
const middlewareDeLogin_1 = require("../../middlewares/middlewareDeLogin");
const router = express_1.default.Router();
router.post('/Organization', OrganizationController_1.default.Post);
router.get('/Organization/:idOrganization/:id', middlewareDeLogin_1.loginRequired, OrganizationController_1.default.GetOne);
router.get('/Organization/:idOrganization', middlewareDeLogin_1.loginRequired, OrganizationController_1.default.GetAll);
router.delete('/Organization/:idOrganization/:id', middlewareDeLogin_1.loginRequired, OrganizationController_1.default.Delete);
exports.default = router;
//# sourceMappingURL=RoutesOrganization.js.map