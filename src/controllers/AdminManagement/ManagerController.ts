import Express from 'express';
import Manager from '../../entity/Manager';
import { loginRequired } from 'src/middleares/middlewareDeLogin';

export default class ManagerController {
  static async Post(req: Express.Request, res: Express.Response) {
    try {
      loginRequired(req, res);
      const { name, password, type } = req.body;
      const manager = new Manager({ name: name, password: password, type: type });
      await manager.Post();
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async GetAll(req: Express.Request, res: Express.Response) {
    try {
      loginRequired(req, res);
      const managers = await Manager.GetAll();
      const ManagersDTO = managers.map((ManagersDto) => ({
        name: ManagersDto.name,
        type: ManagersDto.type,
        id: ManagersDto.id,
      }));
      res.status(200).send(ManagersDTO);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async Delete(req: Express.Request, res: Express.Response) {
    try {
      loginRequired(req, res);
      const managerId = req.params.id;
      await Manager.Delete(managerId);
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async Update(req: Express.Request, res: Express.Response) {
    try {
      loginRequired(req, res);
      const manager = await Manager.GetOne(req.params.id);
      if (manager.type == 'Guarda') manager.type = 'Servidor da CAED';
      else manager.type = 'Guarda';
      await manager.Update();
      res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  
  static async Login(req: Express.Request, res: Express.Response){
    try{
      const { name, password} = req.body;
      Manager.Login();
      }
    catch(error){
        console.log(error)
        if(error.message == 'Nome de usuário não informado ou inválido!'
        || 
        error.message == 'Senha não informado ou encontrada!')
        return res.status(401).json({erro: error.message})
        else
        res.status(500).json({error: error.message})
    }
}

static async Logout
}
