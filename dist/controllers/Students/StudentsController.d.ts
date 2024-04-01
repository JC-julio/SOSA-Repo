import Express from 'express';
export default class StudentController {
    static Post(req: Express.Request, res: Express.Response): Promise<void>;
    static GetOne(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static GetAll(req: Express.Request, res: Express.Response): Promise<void>;
    static GetByRegistration(req: Express.Request, res: Express.Response): Promise<void>;
    static GetByClassName(req: Express.Request, res: Express.Response): Promise<void>;
    static Delete(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static DeleteByClassName(req: Express.Request, res: Express.Response): Promise<void>;
    static doUpdate(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static updateAll(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static Update(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
}
