"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default.set('strictQuery', false);
const RoutesStudents_1 = __importDefault(require("./routes/StudentsRoutes/RoutesStudents"));
const RoutesManager_1 = __importDefault(require("./routes/ManagerRoutes/RoutesManager"));
const RoutesMessage_1 = __importDefault(require("./routes/MessageRoutes/RoutesMessage"));
const RoutesExits_1 = __importDefault(require("./routes/ExitsRoutes/RoutesExits"));
const RoutesOrganization_1 = __importDefault(require("./routes/OrganizationRoutes/RoutesOrganization"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
mongoose_1.default.connect(process.env.connectionString);
const app = (0, express_1.default)();
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(RoutesManager_1.default);
app.use(RoutesMessage_1.default);
app.use(RoutesExits_1.default);
app.use(RoutesStudents_1.default);
app.use(RoutesOrganization_1.default);
app.listen(3000);
//# sourceMappingURL=main.js.map