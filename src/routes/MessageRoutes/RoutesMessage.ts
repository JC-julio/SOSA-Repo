import express from 'express';
import MessageController from '../../controllers/Message/MessageController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Message/:idOrganization', loginRequired, MessageController.post)

router.get('/Message/:idOrganization', loginRequired, MessageController.GetAll)

router.delete('/Message/:id', loginRequired, MessageController.delete)

router.put('/Message/:idOrganization/:id', loginRequired, MessageController.updateAll)

export default router;