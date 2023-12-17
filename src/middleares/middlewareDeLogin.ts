import { Request, Response } from "express";

export function loginRequired(req:Request, res:Response){
        if (!req.header['autorization']) {
          throw new Error("Você deve estar logado para acessar esta pagina");
        }
}
