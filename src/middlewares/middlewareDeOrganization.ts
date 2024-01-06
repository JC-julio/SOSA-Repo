import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { TokenModel } from '../entity/models/BlackListDB';

export async function organizationRequired(req:Request, res:Response, nextFunction: NextFunction) {
    const { idOrganization } = req.params;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({msg: 'Token de autorização ausente'});
    }
    const isBlacklisted = await TokenModel.find({bannedToken: token})
    if (isBlacklisted[0]){
        return res.status(401).json({msg:'Token expirado'})
    }
    jwt.verify(token, process.env.secretJWTkey, (err, payload, qualquerCoisa) => {
        console.log('entrei a arrow function')
        console.log(err)
        console.log(payload)
        console.log(qualquerCoisa)
        if (err) {
            return res.status(500).json({msg: 'Token inválido'});
        }    
        if (payload.organizationId != idOrganization) {
            return res.status(403).json({msg: 'rota inacessivel'})
        }
    })
    nextFunction()
};
