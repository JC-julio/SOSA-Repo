import  Express  from "express";
import Organization from "src/entity/Organization";
import { OrganizationModel } from "src/entity/models/OrganizationDB";

export default class OrganizationManagement{
    static async Post(req: Express.Request, res: Express.Response) {
        try{
            const name = req.body
            const person = new Organization({
                name: this.name, 
            })
            const personId = (await person.Post()).id
            res.status(201).json({Id: personId});
        } catch(error){
            console.error(error);
            res.send(500).json({msg: error.message})
        }
    }
    static async GetOne(req: Express.Request, res: Express.Response) {
        try{
            const { personId } = req.params
            const organization = await OrganizationModel.findById(personId);
            res.status(226).send(organization);
        } catch(error) {
            console.error(error)
            res.status(500).json({msg: error.message})
        }
    }
    static async GetAll(req: Express.Request, res: Express.Response) {
        try{
            const persons = await Organization.GetAll();
            persons.map((Data) => ({
                name: Data.name,
                id: Data.id,
            }))
            res.status(226).send(persons);
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message});
        }
    }
    static async Delete(req: Express.Request, res: Express.Response) {
        try{
            const { personId } = req.params;
            await Organization.Delete(personId);
            res.status(200).end()
        } catch(error) {
            console.error(error);
            res.status(500).json({msg: error.message});
        }
    }
}