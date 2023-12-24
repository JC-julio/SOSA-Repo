// Importando os módulos necessários
import express from 'express';
import ClassController from '../../controllers/StudentsManagement/ClassController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

const router = express.Router();

router.post('/StudentsManagement', loginRequired, ClassController.Post);

router.get('/StudentsManagement/:id', loginRequired, ClassController.GetOne);

router.get('/StudentsManagement', loginRequired, ClassController.GetAll);

router.delete('/StudentsManagement/:id', loginRequired, ClassController.Delete);

export default router;