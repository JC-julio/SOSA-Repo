"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = __importDefault(require("../../entity/Manager"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class ManagerController {
    static async Post(req, res) {
        try {
            const { name, password, type, } = req.body;
            const { idOrganization } = req.params;
            const manager = new Manager_1.default({ name: name, password: password, type: type, organizationId: idOrganization });
            const newManager = (await manager.Post());
            const objectReturn = {
                name: newManager.name,
                type: newManager.type,
                id: newManager.id,
            };
            res.status(200).send(objectReturn);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Um usuário com este nome já existe': {
                    errorNumber = 400;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async GetOne(req, res) {
        try {
            const managerId = req.params.id;
            const returnManager = await Manager_1.default.GetOne(managerId);
            if (returnManager.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            res.status(226).send(returnManager);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Administrador não encontrado': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async GetAll(req, res) {
        try {
            const managers = await Manager_1.default.GetAll(req.params.idOrganization);
            managers.map((ManagersDto) => ({
                name: ManagersDto.name,
                type: ManagersDto.type,
                organizationId: ManagersDto.organizationId,
                id: ManagersDto.id,
            }));
            res.status(226).send(managers);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    static async Delete(req, res) {
        try {
            const managerId = req.params.id;
            const GetOneManager = await Manager_1.default.GetOne(managerId);
            if (GetOneManager.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            await Manager_1.default.Delete(managerId);
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Administrador não encontrado': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async Update(req, res) {
        try {
            const GetOneManager = await Manager_1.default.GetOne(req.params.id);
            if (GetOneManager.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            if (GetOneManager.type == 'Guarda')
                GetOneManager.type = 'Servidor da CAED';
            else
                GetOneManager.type = 'Guarda';
            await GetOneManager.Update();
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Administrador não encontrado': {
                    errorNumber = 404;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async Login(req, res) {
        try {
            const { user, password } = req.body;
            const tokenAndManager = await Manager_1.default.Login(user, password);
            res.status(200).json(tokenAndManager);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Nome de usuário não informado': {
                    errorNumber = 400;
                    break;
                }
                case 'Senha não informada': {
                    errorNumber = 400;
                    break;
                }
                case 'Nome de usuário inválido!': {
                    errorNumber = 401;
                    break;
                }
                case "Senha incorreta": {
                    errorNumber = 400;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async Logout(req, res) {
        try {
            const Token = req.params.token;
            await Manager_1.default.logout(Token);
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Token inválido': {
                    errorNumber = 401;
                    break;
                }
                default: {
                    errorNumber = 500;
                    break;
                }
            }
            res.status(errorNumber).json({ msg: error.message });
        }
    }
}
exports.default = ManagerController;
//# sourceMappingURL=ManagerController.js.map