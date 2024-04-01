import Express from "express";
export default class OrganizationManagement {
    static Post(req: Express.Request, res: Express.Response): Promise<void>;
    static GetOne(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static GetAll(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
    static Delete(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
}
