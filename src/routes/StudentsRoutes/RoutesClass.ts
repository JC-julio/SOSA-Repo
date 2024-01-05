import express from 'express';
import ClassController from '../../controllers/StudentsManagement/ClassController';
import { organizationRequired } from 'src/middlewares/middlewareDeOrganization';
//ALL TESTED

const router = express.Router();

router.post('/Organization/:idOrganization/Class', organizationRequired, ClassController.Post);

router.get('/Organization/:idOrganization/Class/:id', organizationRequired, ClassController.GetOne);

router.get('/Organization/:idOrganization/Class', organizationRequired, ClassController.GetAll);

router.delete('/Organization/:idOrganization/Class/:id', organizationRequired, ClassController.Delete);

export default router;