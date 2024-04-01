"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exits_1 = __importDefault(require("../../entity/Exits"));
const bull_1 = __importDefault(require("bull"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const redisUrl = `redis://default:${process.env.passwordRedis}@${process.env.hostRedis}:17437`;
const updateQueue = new bull_1.default('updateQueue', redisUrl);
updateQueue.process(async (job) => {
    const { exitId, idOrganization } = job.data;
    const isExpiredOutput = await Exits_1.default.GetOne(exitId);
    if (isExpiredOutput.organizationId == idOrganization)
        if (isExpiredOutput.confirmExit == 'Saída em progresso')
            isExpiredOutput.confirmExit = 'Saída expirada';
    await isExpiredOutput.Update();
});
class ExitsController {
    static async Post(req, res) {
        try {
            const { observes, dateExit, idStudent, idWorker } = req.body;
            const { idOrganization } = req.params;
            const Exit = new Exits_1.default({
                idStudent: idStudent,
                idWorker: idWorker,
                organizationId: idOrganization,
                observes: observes,
                dateExit: dateExit,
            });
            const exit = (await Exit.Post());
            const objectExit = {
                idStudent: exit.idStudent,
                idWorker: exit.idWorker,
                organizationId: exit.organizationId,
                observes: exit.observes,
                dateExit: exit.dateExit,
                id: exit.id
            };
            await ExitsController.checkStatusExit(objectExit.id, idOrganization);
            res.status(201).json(objectExit);
        }
        catch (error) {
            console.error(error);
            res.send(500).json({ msg: error.message });
        }
    }
    static async checkStatusExit(exitId, idOrganization) {
        const waitTimeForVerification = 30 * 60 * 1000;
        updateQueue.add({ exitId, idOrganization }, { delay: waitTimeForVerification });
    }
    static async GetOne(req, res) {
        try {
            const ExitID = req.params.id;
            const returnExit = await Exits_1.default.GetOne(ExitID);
            if (returnExit.organizationId != req.params.idOrganization)
                return res.status(401).json({ msg: 'rota inacessivel' });
            res.status(226).send(returnExit);
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Registro não encontrado': {
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
    static async GetExits(req, res) {
        try {
            const dateInit = new Date(req.params.dateInit);
            const dateEnd = new Date(req.params.dateEnd);
            const returnExits = await Exits_1.default.GetExits(dateInit, dateEnd, req.params.idOrganization);
            if (returnExits.length == 0)
                return res.status(404).json({ msg: 'nenhuma saida encontrada!' });
            returnExits.map((Data) => ({
                idStudent: Data.idStudent,
                idWorker: Data.idWorker,
                organizationId: Data.organizationId,
                time: Data.time,
                observes: Data.observes,
                dateExit: Data.dateExit,
                confirmExit: Data.confirmExit,
                id: Data.id,
            }));
            res.status(226).send(returnExits);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
    static async GetAll(req, res) {
        try {
            const returnExits = await Exits_1.default.GetAll(req.params.idOrganization);
            returnExits.map((Data) => ({
                idStudent: Data.idStudent,
                idWorker: Data.idWorker,
                organizationId: Data.organizationId,
                time: Data.time,
                observes: Data.observes,
                dateExit: Data.dateExit,
                confirmExit: Data.confirmExit,
                id: Data.id,
            }));
            res.status(226).send(returnExits);
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
    static async DeleteAll(req, res) {
        try {
            await Exits_1.default.DeleteAll(req.params.idOrganization);
            res.status(200).end();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
    static async Update(req, res) {
        try {
            const exit = await Exits_1.default.GetOne(req.params.id);
            if (exit.organizationId != req.params.idOrganization)
                return res.status(403).json({ msg: 'rota inacessivel' });
            exit.confirmExit = 'Saida concluida';
            await exit.Update();
            res.status(200).end();
        }
        catch (error) {
            let errorNumber;
            switch (error.message) {
                case 'Registro não encontrado': {
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
exports.default = ExitsController;
//# sourceMappingURL=ExitsController.js.map