import { Response, Request, NextFunction } from 'express';
export declare function loginRequired(req: Request, res: Response, nextFunction: NextFunction): Promise<Response<any, Record<string, any>>>;
