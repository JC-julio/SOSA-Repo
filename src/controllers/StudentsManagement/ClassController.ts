import Express from 'express';
import StudentClass from '../../entity/Class';
import { loginRequired } from 'src/middleares/middlewareDeLogin';

export default class ClassController {
    static async Post(req: Express.Request, res: Express.Response){
        try{
            loginRequired(req, res);
            const {name} = req.body;
            const Class = new StudentClass({nameClass:name});
            await Class.Post();
            res.status(201).end();
        }catch(error){
            res.status(500).json({ error: error.message });
    }
}

    static async GetAll(req: Express.Request, res: Express.Response){
        try{
            loginRequired(req, res);
            const classes = await StudentClass.GetAll();
            const classesDTO = classes.map((ClassesDTO) => ({
            name: ClassesDTO.nameClass,
            id: ClassesDTO.id,
            }))
            res.status(226).json(classesDTO);
        }catch(error){
            res.status(500).json({ error: error.message });
    }
}

    static async Delete(req: Express.Request, res: Express.Response){
        const ClassID = req.body.id;
        try{
            loginRequired(req, res);
            await StudentClass.Delete(ClassID);
            res.status(200).end();
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }
}