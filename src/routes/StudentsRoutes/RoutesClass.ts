// Importando os módulos necessários
import express from 'express';
import ClassController from '../../controllers/StudentsManagement/ClassController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

const router = express.Router();

router.post('/Class', ClassController.Post);

router.get('/Class/:id', loginRequired, ClassController.GetOne);

router.get('/Class', loginRequired, ClassController.GetAll);

router.delete('/Class/:id', loginRequired, ClassController.Delete);

export default router;