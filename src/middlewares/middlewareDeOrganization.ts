import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { TokenModel } from '../entity/models/BlackListDB';

export function organizationRequired(req:Request, res:Response, nextFunction: NextFunction) {
    const { idOrganization } = req.params;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({msg: 'Token de autorização ausente'});
    }
    jwt.verify(token, process.env.secretJWTkey, (err, decoded) => {
        if (err) {
            return res.status(500).json({msg: 'Token inválido'});
        }
        const returnToken = TokenModel.find({bannedToken: token})
        if (returnToken){
            return res.status(401).json({msg:'Token expirado'})
        }  else {
            if (decoded.organizationId == idOrganization) {
             nextFunction() }
}});
}