import {Response, Request, NextFunction} from 'express';
import jwt from "jsonwebtoken"
import { TokenModel } from '../entity/models/BlackListDB';


export async function loginRequired(req:Request, res:Response, nextFunction: NextFunction){
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({msg:"Você deve estar logado para acessar esta pagina"})
    }
    if (!jwt.verify(token, process.env.secretJWTkey))
        return res.status(401).json({msg:'Token inválido'})
    const returnToken = await TokenModel.findOne({bannedToken: token})
    if (returnToken){
        return res.status(401).json({msg:'Token expirado'})
    }
    nextFunction();
}