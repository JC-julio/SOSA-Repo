import express from 'express';
import ManagerController from '../../controllers/AdminManagement/ManagerController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Organization/:idOrganization/Admin', ManagerController.Post);

router.get('/Organization/:idOrganization/Admin', loginRequired, ManagerController.GetAll);

router.get('/Organization/:idOrganization/Admin/:id', loginRequired, ManagerController.GetOne);

router.delete('/Organization/:idOrganization/Admin/:id', loginRequired, ManagerController.Delete);

router.put('/Organization/:idOrganization/Admin/:id', loginRequired, ManagerController.Update);

router.post('/Organization/:idOrganization/Login', ManagerController.Login);

router.post('/Organization/:idOrganization/Logout/:token', loginRequired, ManagerController.Logout);

export default router;
