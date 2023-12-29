import express from 'express';
import StudentsController from '../../controllers/StudentsManagement/StudentsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

const router = express.Router();

router.post('/Student', StudentsController.Post);

router.get('/Student/:id', loginRequired, StudentsController.GetOne);

router.get('/Student/Class/:ClassName', loginRequired, StudentsController.GetByClassName);

router.delete('/Student/:id', loginRequired, StudentsController.Delete);

router.put('/Student/:id', loginRequired, StudentsController.Update);

export default router;