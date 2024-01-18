import  Express  from "express";
import Organization from "../../entity/Organization";
import Manager from "../../entity/Manager";
//all right
export default class OrganizationManagement{
    static async Post(req: Express.Request, res: Express.Response) {
        try{
            const organizationDto = req.body.organization
            const managerDto = req.body.manager;
            const organization = new Organization({
                name: organizationDto.name, 
            })
            const organizationId = (await organization.Post()).id
            const NewManager = new Manager({
                name: managerDto.name,
                type: managerDto.type,
                password: managerDto.password,
                organizationId: organizationId
            })
            const returnManager = (await NewManager.Post())
            const manager = {
                name: returnManager.name,
                type: returnManager.type,
                id: returnManager.id,
                organizationId: organizationId,
              }
            res.status(201).json({manager});
        } catch(error) {
            let errorNumber: number;
            switch( error.message ){
                case 'Um usuário com este nome já existe': {
                    errorNumber = 400
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
    static async GetOne(req: Express.Request, res: Express.Response) {
        try{
            const  personId  = req.params.id
            const organization = await Organization.GetOne(personId);
            if (organization.id != req.params.idOrganization)
                return res.status(403).json({msg: 'rota inacessivel'});
            res.status(226).send(organization);
        } catch(error) {
            let errorNumber: number;
            switch( error.message ){
                case 'Organização não encontrada!': {
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
    static async GetAll(req: Express.Request, res: Express.Response) {
        try{
            const organizations = await Organization.GetAll();
            if (organizations.length == 0)
                return res.status(404).json({msg: 'nenhuma organização encontrada'})
            organizations.map((Data) => ({
                name: Data.name,
                id: Data.id,
            }))    
            res.status(226).send(organizations);
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message});
        }
    }
    static async Delete(req: Express.Request, res: Express.Response) {
        try{
            const personId  = req.params.id;
            const organization = await Organization.GetOne(personId);
            if (organization.id != req.params.idOrganization)
                return res.status(403).json({msg: 'rota inacessivel'});
            await Organization.Delete(personId);
            res.status(200).end()
        } catch(error){
            let errorNumber: number;
            switch( error.message ){
                case 'Organização não encontrada!': {
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
}