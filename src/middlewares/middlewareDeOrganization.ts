import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"

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
        if (decoded.organizationId == idOrganization) {
            nextFunction();
        } else {
            return res.status(401).json({msg: 'Não autorizado'});
        }
    });
}