import Express from "express";
export default class MessageController {
    static post(req: Express.Request, res: Express.Response): Promise<void>;
    static GetAll(req: Express.Request, res: Express.Response): Promise<void>;
    static delete(req: Express.Request, res: Express.Response): Promise<void>;
    static updateAll(req: Express.Request, res: Express.Response): Promise<Express.Response<any, Record<string, any>>>;
}
