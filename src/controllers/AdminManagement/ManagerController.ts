import Express from 'express';
import Manager from '../../entity/Manager';

export default class ManagerController {
  static async Post(req: Express.Request, res: Express.Response) {
    const { name, password, type } = req.body;
    const manager = new Manager({ name: name, password: password, type: type });
    await manager.Post();
    res.redirect('back');
  }
  static async GetAll(req: Express.Request, res: Express.Response) {
    const managers = await Manager.GetAll();
    const ManagersDTO = managers.map((ManagersDto) => ({
      name: ManagersDto.name,
      type: ManagersDto.type,
      id: ManagersDto.id,
    }));
    res.render('AdminManagement', { ManagersOutput: ManagersDTO });
  }

  static async Delete(req: Express.Request, res: Express.Response) {
    const managerId = req.params.id;
    try {
      await Manager.Delete(managerId);
      res.redirect('back');
    } catch (error) {
      console.log(error);
      res.json({ error: error.message });
    }
  }

  static async Update(req: Express.Request, res: Express.Response) {
    const manager = await Manager.GetOne(req.params.id);
    if (manager.type == 'Guarda') manager.type = 'Servidor da CAED';
    else manager.type = 'Guarda';
    manager.Update();
    res.redirect('back');
  }
}
