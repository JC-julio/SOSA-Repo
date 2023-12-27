import express from 'express';
import ManagerController from '../../controllers/AdminManagement/ManagerController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

const router = express.Router();

router.get('/AdminManagement', loginRequired, ManagerController.GetAll);

router.post('/AdminManagement', ManagerController.Post);

router.get('/AdminManagement/:id', loginRequired, ManagerController.GetOne);

router.delete('/AdminManagement/:id', loginRequired, ManagerController.Delete);

router.put('/AdminManagement/:id', loginRequired, ManagerController.Update);

router.post('/Login', ManagerController.Login);

router.get('/Logout', loginRequired, ManagerController.Logout);

export default router;
