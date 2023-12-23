// Importando os módulos necessários
import express from 'express';
import ManagerController from '../controllers/AdminManagement/ManagerController';
import ClassController from '../controllers/StudentsManagement/ClassController';
import { loginRequired } from '../middlewares/middlewareDeLogin';

const router = express.Router();


router.get('/Home', (req, res) => {
  res.render('Home');
});

router.get('/VisualizaGuarita', (req, res) => {
  res.render('VisualizaGuarita');
});

router.get('/AdminManagement', loginRequired, ManagerController.GetAll);

router.post('/AdminManagement', loginRequired, ManagerController.Post);

router.delete('/AdminManagement/:id', loginRequired, ManagerController.Delete);

router.put('/AdminManagement/:id', loginRequired, ManagerController.Update);

router.post('/StudentsManagement', loginRequired, ClassController.Post);

export default router;