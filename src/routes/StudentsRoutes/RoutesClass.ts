import express from 'express';
import ClassController from '../../controllers/StudentsManagement/ClassController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';
//ALL right

const router = express.Router();

router.post('/Organization/:idOrganization/Class', loginRequired, ClassController.Post);

router.get('/Organization/:idOrganization/Class/:id', loginRequired, ClassController.GetOne);

router.get('/Organization/:idOrganization/Class', loginRequired, ClassController.GetAll);

router.delete('/Organization/:idOrganization/Class/:id', loginRequired, ClassController.Delete);

export default router;