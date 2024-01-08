import express from 'express';
import ManagerController from '../../controllers/Admin/ManagerController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Admin/:idOrganization', loginRequired, ManagerController.Post);

router.get('/Admin/:idOrganization', loginRequired, ManagerController.GetAll);

router.get('/Admin/:idOrganization/:id', loginRequired, ManagerController.GetOne);

router.delete('/Admin/:idOrganization/:id', loginRequired, ManagerController.Delete);

router.put('/Admin/:idOrganization/:id', loginRequired, ManagerController.Update);

router.post('/Admin/Login', ManagerController.Login);

router.post('/Admin/Logout/:token', loginRequired, ManagerController.Logout);

export default router;
