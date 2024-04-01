"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BlackListDB_1 = require("../entity/models/BlackListDB");
async function loginRequired(req, res, nextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "Você deve estar logado para acessar esta pagina" });
    }
    if (!jsonwebtoken_1.default.verify(token, process.env.secretJWTkey))
        return res.status(401).json({ msg: 'Token inválido' });
    const returnToken = await BlackListDB_1.TokenModel.findOne({ bannedToken: token });
    if (returnToken) {
        return res.status(401).json({ msg: 'Token expirado' });
    }
    nextFunction();
}
exports.loginRequired = loginRequired;
//# sourceMappingURL=middlewareDeLogin.js.map