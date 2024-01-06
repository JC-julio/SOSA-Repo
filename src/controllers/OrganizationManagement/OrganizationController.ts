import  Express  from "express";
import Organization from "../../entity/Organization";
import Manager from "../../entity/Manager";

export default class OrganizationManagement{
    static async Post(req: Express.Request, res: Express.Response) {
        try{
            const organizationDto = req.body.organization
            const managerDto = req.body.manager;
            const organization = new Organization({
                name: organizationDto.name, 
            })
            const organizationId = (await organization.Post()).id
            const manager = new Manager({
                name: managerDto.name,
                type: managerDto.type,
                password: managerDto.password,
                organizationId: organizationId
            })
            const managerId = (await manager.Post()).id
            res.status(201).json({organizationId, managerId});
        } catch(error){
            console.error(error);
            res.send(500).json({msg: error.message})
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
            console.error(error)
            res.status(500).json({msg: error.message})
        }
    }
    static async GetAll(req: Express.Request, res: Express.Response) {
        try{
            const organizations = await Organization.GetAll();
                const FilterOrganizations = organizations.filter(organizacao =>
                req.params.idOrganization.includes(organizacao.id)
                );
                if (FilterOrganizations.length == 0)
                    res.status(404).json({msg: 'nenhuma organização encontrada'})
            FilterOrganizations.map((Data) => ({
                name: Data.name,
                id: Data.id,
            }))    
            res.status(226).send(FilterOrganizations);
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
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message});
        }
    }
}