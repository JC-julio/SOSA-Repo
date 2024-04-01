"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../entity/Message"));
class MessageController {
    static async post(req, res) {
        try {
            const objectMessage = {
                value: req.body.value,
                idManager: req.body.idManager,
                exibDate: req.body.exibDate,
                organizationId: req.params.idOrganization
            };
            const message = new Message_1.default(objectMessage);
            const postMessage = await message.post();
            const objectReturn = {
                value: postMessage.value,
                idManager: postMessage.idManager,
                exibDate: postMessage.exibDate,
                organizationId: postMessage.organizationId,
                id: postMessage.id,
            };
            res.status(200).send(objectReturn);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    static async GetAll(req, res) {
        try {
            const messages = await Message_1.default.GetAll(req.params.idOrganization);
            messages.map((Data) => ({
                value: Data.value,
                idManager: Data.idManager,
                exibDate: Data.exibDate,
                organizationId: Data.organizationId,
                id: Data.id,
            }));
            res.status(226).send(messages);
        }
        catch (error) {
            let errorNumber;
            res.status(errorNumber).json({ msg: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            await Message_1.default.delete(id);
            res.status(200).end();
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    static async updateAll(req, res) {
        try {
            const message = await Message_1.default.getOne(req.params.id);
            if (message.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            message.value = req.body.value;
            message.idManager = req.body.idManager;
            message.exibDate = req.body.exibDate;
            await message.updateAll();
            res.status(200).json({ msg: 'oi' });
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}
exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map