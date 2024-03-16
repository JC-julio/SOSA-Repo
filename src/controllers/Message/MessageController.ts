import  Express  from "express";
import  Message from "../../entity/Message";

export default class MessageController {
    static async post(req: Express.Request, res: Express.Response) {
        try{
            const objectMessage = {
                value: req.body.value,
                idManager: req.body.idManager,
                exibDate: req.body.exibDate,
                organizationId: req.params.idOrganization
            }
            const message = new Message(objectMessage)
            const postMessage = await message.post()
            const objectReturn = {
                value: postMessage.value,
                idManager: postMessage.idManager,
                exibDate: postMessage.exibDate,
                organizationId: postMessage.organizationId,
                id: postMessage.id,
            }
            res.status(200).send(objectReturn)
        } catch(error) {
            res.status(500).send(error)
        }
    }

    static async GetAll(req: Express.Request, res: Express.Response) {
        try{
            const messages = await Message.GetAll(req.params.idOrganization);
            messages.map((Data) => ({
                value: Data.value,
                idManager: Data.idManager,
                exibDate: Data.exibDate,
                organizationId: Data.organizationId,
                id: Data.id,
            }))
            res.status(226).send(messages)
        } catch(error) {
            let errorNumber: number;
            res.status(errorNumber).json({msg: error.message})
        }
    }

    static async delete(req: Express.Request, res: Express.Response) {
        try{
            const {id} = req.params
            await Message.delete(id)
            res.status(200).end()
        } catch(error) {
            res.status(500).send(error)
        }
    }

    static async updateAll(req:Express.Request, res:Express.Response) {
        try {
          const message = await Message.getOne(req.params.id);
          if(message.organizationId != req.params.idOrganization)
            return res.status(401).json({msg: 'rota inacessivel'})
          message.value = req.body.value
          message.idManager = req.body.idManager
          message.exibDate = req.body.exibDate
          await message.updateAll()
          res.status(200).end()
        } catch(error) {
          res.status(500).send(error)
        }
    }
}