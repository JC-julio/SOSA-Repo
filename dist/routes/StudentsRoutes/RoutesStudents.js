"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentsController_1 = __importDefault(require("../../controllers/Students/StudentsController"));
const middlewareDeLogin_1 = require("../../middlewares/middlewareDeLogin");
const router = express_1.default.Router();
router.post('/Student/:idOrganization', middlewareDeLogin_1.loginRequired, StudentsController_1.default.Post);
router.get('/Student/:idOrganization/:id', middlewareDeLogin_1.loginRequired, StudentsController_1.default.GetOne);
router.get("/Student/:idOrganization", middlewareDeLogin_1.loginRequired, StudentsController_1.default.GetAll);
router.get('/StudentGetByRegistration/:registration/:idOrganization', middlewareDeLogin_1.loginRequired, StudentsController_1.default.GetByRegistration);
router.get('/StudentGet/:idOrganization/:className', middlewareDeLogin_1.loginRequired, StudentsController_1.default.GetByClassName);
router.delete('/Student/:idOrganization/:id', middlewareDeLogin_1.loginRequired, StudentsController_1.default.Delete);
router.delete('/StudentDel/:idOrganization/:className', middlewareDeLogin_1.loginRequired, StudentsController_1.default.DeleteByClassName);
router.put('/Student/:idOrganization/:id', middlewareDeLogin_1.loginRequired, StudentsController_1.default.updateAll);
router.put('/Student/:idOrganization', middlewareDeLogin_1.loginRequired, StudentsController_1.default.doUpdate);
exports.default = router;
//# sourceMappingURL=RoutesStudents.js.map