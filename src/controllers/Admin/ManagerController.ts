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
      const newManager = (await manager.Post());
      const objectReturn = {
        name: newManager.name,
        type: newManager.type,
        id: newManager.id,
      }
      res.status(200).send(objectReturn)
    } catch (error) {
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

  static async GetOne(req:Express.Request, res:Express.Response) {
    try{
      const managerId = req.params.id;
      const returnManager = await Manager.GetOne(managerId);
      if (returnManager.organizationId != req.params.idOrganization)
       return res.status(401).json({msg: 'rota inacessivel'})
      res.status(226).send(returnManager);
    } catch(error) {
      let errorNumber: number;
      switch( error.message ){
          case 'Administrador não encontrado': {
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
    try {
      const managers = await Manager.GetAll(req.params.idOrganization);
      managers.map((ManagersDto) => ({
        name: ManagersDto.name,
        type: ManagersDto.type,
        organizationId: ManagersDto.organizationId,
        id: ManagersDto.id,
     }));
      res.status(226).send(managers);
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
        return res.status(401).json({msg: 'rota inacessivel'})
      await Manager.Delete(managerId);
      res.status(200).end();
    } catch (error){
      let errorNumber: number;
      switch( error.message ){
          case 'Administrador não encontrado': {
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

  static async Update(req: Express.Request, res: Express.Response) {
    try {
      const GetOneManager = await Manager.GetOne(req.params.id);
      if(GetOneManager.organizationId != req.params.idOrganization)
      return res.status(401).json({msg: 'rota inacessivel'})
      if (GetOneManager.type == 'Guarda') 
      GetOneManager.type = 'Servidor da CAED';
      else 
      GetOneManager.type = 'Guarda';
      await GetOneManager.Update();
      res.status(200).end();
    } catch (error) {
      let errorNumber: number;
      switch( error.message ){
          case 'Administrador não encontrado': {
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

  static async Login(req: Express.Request, res: Express.Response) {
    try {
      const {user, password} = req.body;
      const tokenAndManager = await Manager.Login(user, password);
      res.status(200).json(tokenAndManager)
    } catch(error) {
      let errorNumber: number;
      switch( error.message ){
          case 'Nome de usuário não informado': {
            errorNumber = 400
            break
          }
          case 'Senha não informada': {
            errorNumber = 400
            break
          }
          case 'Nome de usuário inválido!': {
            errorNumber = 401
            break
          }
          case "Senha incorreta": {
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

  static async Logout(req: Express.Request, res: Express.Response) {
    try {
      const Token = req.params.token;
      await Manager.logout(Token);
      res.status(200).end();
    } catch(error) {
      let errorNumber: number;
      switch( error.message ){
          case 'Token inválido': {
              errorNumber = 401
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