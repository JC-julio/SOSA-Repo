"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Organization_1 = __importDefault(require("../../entity/Organization"));
const Manager_1 = __importDefault(require("../../entity/Manager"));
class OrganizationManagement {
    static async Post(req, res) {
        try {
            const organizationDto = req.body.organization;
            const managerDto = req.body.manager;
            const organization = new Organization_1.default({
                name: organizationDto.name,
            });
            const organizationPost = (await organization.Post());
            const NewManager = new Manager_1.default({
                name: managerDto.name,
                type: managerDto.type,
                password: managerDto.password,
                organizationId: organizationPost.id
            });
            const returnManager = (await NewManager.Post());
            const manager = {
                name: returnManager.name,
                type: returnManager.type,
                id: returnManager.id,
                organizationId: organizationPost.id,
                organizationName: organizationPost.name
            };
            res.status(201).json(manager);
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
            const personId = req.params.id;
            const organization = await Organization_1.default.GetOne(personId);
            if (organization.id != req.params.idOrganization)
                return res.status(403).json({ msg: 'rota inacessivel' });
            res.status(226).send(organization);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Organização não encontrada!': {
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
            const organizations = await Organization_1.default.GetAll();
            if (organizations.length == 0)
                return res.status(404).json({ msg: 'nenhuma organização encontrada' });
            organizations.map((Data) => ({
                name: Data.name,
                id: Data.id,
            }));
            res.status(226).send(organizations);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
    static async Delete(req, res) {
        try {
            const personId = req.params.id;
            const organization = await Organization_1.default.GetOne(personId);
            if (organization.id != req.params.idOrganization)
                return res.status(403).json({ msg: 'rota inacessivel' });
            await Organization_1.default.Delete(personId);
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Organização não encontrada!': {
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
}
exports.default = OrganizationManagement;
//# sourceMappingURL=OrganizationController.js.map