import express from 'express';
import StudentsController from '../../controllers/StudentsManagement/StudentsController';
import { organizationRequired } from '../../middlewares/middlewareDeOrganization';
//all right
const router = express.Router();

router.post('/Organization/:idOrganization/Student', organizationRequired, StudentsController.Post);

router.get('/Organization/:idOrganization/Student/:id', organizationRequired, StudentsController.GetOne);

router.get('/Organization/:idOrganization/Student/Class/:ClassName', organizationRequired, StudentsController.GetByClassName);

router.delete('/Organization/:idOrganization/Student/:id', organizationRequired, StudentsController.Delete);

router.put('/Organization/:idOrganization/Student/:id', organizationRequired, StudentsController.Update);

export default router;