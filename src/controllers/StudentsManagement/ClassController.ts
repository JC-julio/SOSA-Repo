import Express from 'express';
import StudentClass from '../../entity/Class';

export default class ClassController {
    static async Post(req: Express.Request, res: Express.Response){
        try{
            const {name} = req.body;
            const Class = new StudentClass({nameClass:name});
            await Class.Post();
            res.status(201).end();
        }catch(error){
            res.status(500).json({ error: error.message });
    }
}

    static async GetOne(req: Express.Request, res: Express.Response){
        try{
            const classID = req.params.id;
            const returnClass = await StudentClass.GetOne(classID)
            res.status(226).send(returnClass);
        } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

    static async GetAll(req: Express.Request, res: Express.Response){
        try{
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
            await StudentClass.Delete(ClassID);
            res.status(200).end();
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }
}