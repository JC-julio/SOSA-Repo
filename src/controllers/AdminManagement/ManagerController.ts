import Express from 'express';
import Manager from '../../entity/Manager';
import { config } from 'dotenv';
config();

export default class ManagerController {
  static async Post(req: Express.Request, res: Express.Response) {
    try {
      const { name, password, type, } = req.body;
      const { idOrganization } = req.params
      const manager = new Manager({ name: name, password: password, type: type, organizationId:idOrganization });
      const managerId = (await manager.Post())._id;
      res.status(200).json({Id: managerId});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async GetOne(req:Express.Request, res:Express.Response) {
    try{
      const managerId = req.params.id;
      const returnManager = await Manager.GetOne(managerId);
      if (returnManager.organizationId != req.params.organizationId)
       return res.status(401).json({msg: 'rota inacessivel'})
      res.status(226).send(returnManager);
    } catch(error){
      console.error(error);
      res.status(500).json({msg: error.message});
    }
  }

  static async GetAll(req: Express.Request, res: Express.Response) {
    try {
      const managers = await Manager.GetAll();
      const ManagerByOrganzationId = managers.filter(Admin =>
      req.params.idOrganization.includes(Admin.organizationId));
      ManagerByOrganzationId.map((ManagersDto) => ({
      name: ManagersDto.name,
      type: ManagersDto.type,
      organizationId: ManagersDto.organizationId,
      id: ManagersDto.id,
     }));
      res.status(226).send(ManagerByOrganzationId);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async Delete(req: Express.Request, res: Express.Response) {
    try {
      const managerId = req.params.id;
      const GetOneManager = await Manager.GetOne(managerId);
      if(GetOneManager.organizationId != req.params.idOrganization)
        res.status(401).json({msg: 'rota inacessivel'})
      await Manager.Delete(managerId);
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async Update(req: Express.Request, res: Express.Response) {
    try {
      const GetOneManager = await Manager.GetOne(req.params.id);
      if(GetOneManager.organizationId != req.params.idOrganization)
      res.status(401).json({msg: 'rota inacessivel'})
      if (GetOneManager.type == 'Guarda') 
      GetOneManager.type = 'Servidor da CAED';
      else 
      GetOneManager.type = 'Guarda';
      await GetOneManager.Update();
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async Login(req: Express.Request, res: Express.Response) {
    try {
      const {user, password} = req.body;
      const token = await Manager.Login(user, password);
      res.status(200).json({Token: token})
    } catch(error) {
      console.error(error);
      res.status(500).json({msg: error.message})
    }
  }

  static async Logout(req: Express.Request, res: Express.Response) {
    try {
      const Token = req.params.token;
      await Manager.logout(Token);
      res.status(200).end();
    } catch(error) {
      console.error(error);
      res.status(500).json({msg: error.message});
    }
  }
}