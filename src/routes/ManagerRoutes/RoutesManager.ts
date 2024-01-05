import express from 'express';
import ManagerController from '../../controllers/AdminManagement/ManagerController';
import { organizationRequired } from 'src/middlewares/middlewareDeOrganization';

//ALL TESTED

const router = express.Router();

router.post('/Organization/:idOrganization/Admin', organizationRequired, ManagerController.Post);

router.get('/Organization/:idOrganization/Admin', organizationRequired, ManagerController.GetAll);

router.get('/Organization/:idOrganization/Admin/:id', organizationRequired, ManagerController.GetOne);

router.delete('/Organization/:idOrganization/Admin/:id', organizationRequired, ManagerController.Delete);

router.put('/Organization/:idOrganization/Admin/:id', organizationRequired, ManagerController.Update);

router.post('/Organization/:idOrganization/Login', ManagerController.Login);

router.post('/Organization/:idOrganization/Logout/:token', organizationRequired, ManagerController.Logout);

export default router;
