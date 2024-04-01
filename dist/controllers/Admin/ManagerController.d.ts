import Express from 'express';
export default class ManagerController {
    static Post(req: Express.Request, res: Express.Response): Promise<void>;
    static GetOne(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static GetAll(req: Express.Request, res: Express.Response): Promise<void>;
    static Delete(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static Update(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static Login(req: Express.Request, res: Express.Response): Promise<void>;
    static Logout(req: Express.Request, res: Express.Response): Promise<void>;
}
