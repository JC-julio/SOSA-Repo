import Express from 'express';
import StudentClass from '../../entity/Class';

export default class ClassController {
    static async Post(req: Express.Request, res: Express.Response){
        try{
            const {name} = req.body;
            const { idOrganization } = req.params;
            console.log(name)
            const newClass = new StudentClass({name: name, organizationId: idOrganization});
            const ClassID = (await newClass.Post())._id;
            res.status(201).json({Id: ClassID});
        }catch(error){
            res.status(500).json({ error: error.message });
    }
}

    static async GetOne(req: Express.Request, res: Express.Response){
        try{
            const classID = req.params.id;
            const returnClass = await StudentClass.GetOne(classID)
            if(returnClass.organizationId != req.params.idOrganization)
                res.status(401).json({msg: 'rota inacessivel'})
            res.status(226).send(returnClass);
        } catch (error) {
            res.status(500).json({ error: error.message });
    }
}

    static async GetAll(req: Express.Request, res: Express.Response){
        try{
            const classes = await StudentClass.GetAll();
            const filterClassesByOrganizationId = classes.filter(classes =>
                req.params.idOrganization.includes(classes.organizationId))
            if (filterClassesByOrganizationId.length == 0)
                res.status(404).json({msg: 'nenhuma turma encontrada'})
            filterClassesByOrganizationId.map((ClassesDTO) => ({
            name: ClassesDTO.name,
            organizationId: ClassesDTO.organizationId,
            id: ClassesDTO.id,
            }))
            res.status(226).json(filterClassesByOrganizationId);
        }catch(error){
            res.status(500).json({ error: error.message });
    }
}

    static async Delete(req: Express.Request, res: Express.Response){
        try{
        const ClassID = req.params.id;
        const GetOneClass = await StudentClass.GetOne(ClassID);
        if(GetOneClass.organizationId != req.params.idOrganization)
            res.status(401).json({msg: 'rota inacessivel'})
            await StudentClass.Delete(ClassID);
            res.status(200).end();
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }
}