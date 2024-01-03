import Express from 'express';
import StudentClass from '../../entity/Exits';

export default class ExitsController {
    static async Post(req: Express.Request, res: Express.Response) {
        try{
            const {time, observes, dateExit, confirmExit} = req.body;
            const {idStudent, idWorker} = req.params;
            const Exit = new StudentClass({
                idStudent: idStudent,
                idWorker: idWorker,
                time: time,
                observes: observes,
                dateExit: dateExit,
                confirmExit: confirmExit,
        });
            const exitID = (await Exit.Post())._id;
            res.status(201).json({Id: exitID});
            } catch(error) {
                console.error(error);
                res.send(500).json({msg: error.message})    
            }
    }

    static async GetOne(req: Express.Request, res: Express.Response) {
        try{
            const ExitID = req.params.id;
            const returnExit = await StudentClass.GetOne(ExitID);
            res.status(226).send(returnExit);
        } catch(error) {
            console.error(error);
            res.send(500).json({msg: error.message});
        }
    }
    
    static async GetExits(req: Express.Request, res: Express.Response) {
        try{
            const dateInit = new Date(req.params.dateInit);
            const dateEnd = new Date(req.params.dateEnd);
            const returnExits = await StudentClass.GetExits(dateInit, dateEnd);
            const exits = returnExits.map((Data) => ({
                idStudent: Data.idStudent,
                idWorker: Data.idWorker,
                time: Data.time,
                observes: Data.observes,
                dateExit: Data.dateExit,
                confirmExit: Data.confirmExit,
                id: Data.id,
              }))
              res.status(226).send(exits);
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message})
        }
    }

    static async GetAll(req: Express.Request, res: Express.Response) {
        try {
            const returnExits = await StudentClass.GetAll();
            returnExits.map((Data) => ({
                idStudent: Data.idStudent,
                idWorker: Data.idWorker,
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

    static async DeleteAll(req: Express.Request, res: Express.Response) {
        try {
            await StudentClass.DeleteAll();
            res.status(200).end();
        } catch(error){
            console.error(error);
            res.status(500).json({msg: error.message})
        }
    }

    static async Update(req: Express.Request, res: Express.Response) {
        try{
        const exit = await StudentClass.GetOne(req.params.id);
        if(exit.confirmExit == false)
            exit.confirmExit = true;
        else
            exit.confirmExit = false;
        await exit.Update(); 
        res.status(200).end()
        } catch(error) {
            console.error(error)
            res.status(500).json({msg: error.message})
        }
    }
}
