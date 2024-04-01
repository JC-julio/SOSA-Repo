import Express from 'express';
export default class ExitsController {
    static Post(req: Express.Request, res: Express.Response): Promise<void>;
    static checkStatusExit(exitId: any, idOrganization: any): Promise<void>;
    static GetOne(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static GetExits(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static GetAll(req: Express.Request, res: Express.Response): Promise<void>;
    static DeleteAll(req: Express.Request, res: Express.Response): Promise<void>;
    static Update(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
}
