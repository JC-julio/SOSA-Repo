import express from 'express';
import ManagerController from '../../controllers/AdminManagement/ManagerController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Organization/:organizationId/Admin', ManagerController.Post);

router.get('/Organization/:organizationId/Admin', loginRequired, ManagerController.GetAll);

router.get('/Organization/:organizationId/Admin/:id', loginRequired, ManagerController.GetOne);

router.delete('/Organization/:organizationId/Admin/:id', loginRequired, ManagerController.Delete);

router.put('/Organization/:organizationId/Admin/:id', loginRequired, ManagerController.Update);

router.post('/Organization/:organizationId/Login', ManagerController.Login);

router.post('/Organization/:organizationId/Logout/:token', loginRequired, ManagerController.Logout);

export default router;
