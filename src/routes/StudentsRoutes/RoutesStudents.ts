import express from 'express';
import StudentsController from '../../controllers/StudentsManagement/StudentsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

const router = express.Router();

router.post('/StudentsManagement', loginRequired, StudentsController.Post);

router.get('/StudentsManagement/:id', loginRequired, StudentsController.GetOne);

router.get('StudentsManagement/Class/:id', loginRequired, StudentsController.GetbyClass)

router.delete('/StudentsManagement/:id', loginRequired, StudentsController.Delete);

router.put('/StudentsManagement/:id', loginRequired, StudentsController.Update);

export default router;