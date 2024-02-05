import Express from 'express';
import StudentClass from '../../entity/Exits';
export default class ExitsController {
    static async Post(req: Express.Request, res: Express.Response) {
        try{
            const {observes, dateExit, idStudent, idWorker,} = req.body;
            const {idOrganization} = req.params;
            const Exit = new StudentClass({
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
            }
            ExitsController.checkStatusExit(objectExit.id, idOrganization)
            res.status(201).json(objectExit)
            } catch(error) {
                console.error(error);
                res.send(500).json({msg: error.message})    
            }
    }

    static async GetOne(req: Express.Request, res: Express.Response) {
        try{
            const ExitID = req.params.id;
            const returnExit = await StudentClass.GetOne(ExitID);
            if (returnExit.organizationId != req.params.idOrganization)
            return res.status(401).json({msg: 'rota inacessivel'})
            res.status(226).send(returnExit);
        } catch(error) {
            let errorNumber: number;
            switch( error.message ){
                case 'Registro não encontrado': {
                    errorNumber = 404
                    break
                }
                default: {
                    errorNumber = 500
                    break
                }
            }
            res.status(errorNumber).json({msg: error.message})
        }
    }
    
    static async GetExits(req: Express.Request, res: Express.Response) {
        try{
            const dateInit = new Date(req.params.dateInit);
            const dateEnd = new Date(req.params.dateEnd);
            const returnExits = await StudentClass.GetExits(dateInit, dateEnd, req.params.idOrganization);
            if (returnExits.length == 0)
                return res.status(404).json({msg: 'nenhuma saida encontrada!'})
            returnExits.map((Data) => ({
                idStudent: Data.idStudent,
                idWorker: Data.idWorker,
                organizationId: Data.organizationId,
                time: Data.time,
                observes: Data.observes,
                dateExit: Data.dateExit,
                confirmExit: Data.confirmExit,
                id: Data.id,
            }))
              res.status(226).send(returnExits);
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message})
        }
    }

    static async GetAll(req: Express.Request, res: Express.Response) {
        try {
            const returnExits = await StudentClass.GetAll(req.params.idOrganization);
            returnExits.map((Data) => ({
                idStudent: Data.idStudent,
                idWorker: Data.idWorker,
                organizationId: Data.organizationId,
                time: Data.time,
                observes: Data.observes,
                dateExit: Data.dateExit,
                confirmExit: Data.confirmExit,
                id: Data.id,
              }))
              res.status(226).send(returnExits);
        } catch(error) {
            res.status(500).json({msg: error.message})
        }
    }

    static async DeleteAll(req: Express.Request, res: Express.Response) {
        try {
            await StudentClass.DeleteAll(req.params.idOrganization);
            res.status(200).end();
        } catch(error){
            console.error(error);
            res.status(500).json({msg: error.message})
        }
    }

    static async Update(req: Express.Request, res: Express.Response) {
        try{
        const exit = await StudentClass.GetOne(req.params.id);
        if (exit.organizationId != req.params.idOrganization)
            return res.status(403).json({msg: 'rota inacessivel'})
        exit.confirmExit = 'Saida concluida'
        await exit.Update(); 
        res.status(200).end()
        } catch(error) {
            let errorNumber: number;
            switch( error.message ){
                case 'Registro não encontrado': {
                    errorNumber = 404
                    break
                }
                default: {
                    errorNumber = 500
                    break
                }
            }
            res.status(errorNumber).json({msg: error.message})
        }
    }
    static async checkStatusExit(exitId, idOrganization) {
        const waitTimeForVerification = 180000
        setTimeout(async () => {
            const isExpiredOutput = await StudentClass.GetOne(exitId)
            if (isExpiredOutput.organizationId == idOrganization)
                if (isExpiredOutput.confirmExit == 'Saída em progresso')
                isExpiredOutput.confirmExit = 'Saída expirada'
                await isExpiredOutput.Update();
        }, waitTimeForVerification);
    }
}
