"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ManagerDB_1 = require("../entity/models/ManagerDB");
const BlackListDB_1 = require("../entity/models/BlackListDB");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class Manager {
    constructor(props) {
        this.props = props;
        this.model = ManagerDB_1.ManagerModel;
        this.TokenDB = BlackListDB_1.TokenModel;
    }
    async Post() {
        const password = await bcrypt.hash(this.props.password, 6);
        const isManager = await ManagerDB_1.ManagerModel.find({ name: this.props.name });
        if (isManager.length != 0)
            throw new Error("Um usuário com este nome já existe");
        return await this.model.create({
            name: this.props.name,
            type: this.props.type,
            password: password,
            organizationId: this.props.organizationId,
        });
    }
    static async GetOne(managerId) {
        const manager = await ManagerDB_1.ManagerModel.findById(managerId);
        if (!manager)
            throw new Error('Administrador não encontrado');
        return new Manager({
            name: manager.name,
            type: manager.type,
            organizationId: manager.organizationId,
            id: manager.id,
        });
    }
    static async GetAll(idOrganization) {
        const managers = await ManagerDB_1.ManagerModel.find({ organizationId: idOrganization });
        return managers.map((Data) => new Manager({
            name: Data.name,
            type: Data.type,
            id: Data.id,
            organizationId: Data.organizationId
        }));
    }
    static async Delete(managerId) {
        await ManagerDB_1.ManagerModel.findByIdAndDelete(managerId);
    }
    async Update() {
        await ManagerDB_1.ManagerModel.findByIdAndUpdate(this.id, {
            type: this.type,
        });
    }
    static async Login(user, password) {
        if (!user)
            throw new Error('Nome de usuário não informado');
        if (!password)
            throw new Error('Senha não informada');
        const [manager] = await ManagerDB_1.ManagerModel.find({ name: user });
        if (!manager)
            throw new Error('Nome de usuário inválido!');
        const passwordIsValid = await bcrypt.compare(password, manager['password']);
        if (!passwordIsValid) {
            throw new Error("Senha incorreta");
        }
        else {
            const token = jsonwebtoken_1.default.sign({ managerEntity: manager['id'] }, process.env.secretJWTkey, { expiresIn: '7d' });
            const objectReturn = {
                token: token,
                manager: {
                    name: manager['name'],
                    type: manager['type'],
                    id: manager['id'],
                    organizationId: manager['organizationId'],
                }
            };
            return objectReturn;
        }
    }
    static async logout(Token) {
        const countToken = await BlackListDB_1.TokenModel.find().countDocuments();
        if (countToken >= 30) {
            await BlackListDB_1.TokenModel.deleteMany();
        }
        const tokenVerificado = jsonwebtoken_1.default.verify(Token, process.env.secretJWTkey);
        if (tokenVerificado) {
            return BlackListDB_1.TokenModel.create({
                bannedToken: Token,
            });
        }
        else {
            throw new Error("Token inválido");
        }
    }
    get name() {
        return this.props.name;
    }
    get password() {
        return this.props.password;
    }
    get type() {
        return this.props.type;
    }
    get id() {
        return this.props.id;
    }
    get organizationId() {
        return this.props.organizationId;
    }
    set name(name) {
        this.props.name = name;
    }
    set password(password) {
        this.props.password = password;
    }
    set type(type) {
        this.props.type = type;
    }
}
exports.default = Manager;
//# sourceMappingURL=Manager.js.map