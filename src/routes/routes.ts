// Importando os módulos necessários
import express from 'express';
import ManagerController from '../controllers/AdminManagement/ManagerController';

const router = express.Router();

router.get('/Home', (req, res) => {
  // res.send({ info: 'sim' });
  res.render('Home');
});

router.get('/VisualizaGuarita', (req, res) => {
  res.render('VisualizaGuarita');
});

router.get('/AdminManagement', ManagerController.GetAll);

router.post('/AdminManagement', ManagerController.Post);

router.delete('/AdminManagement/:id', ManagerController.Delete);

router.put('/AdminManagement/:id', ManagerController.Update);

router.get('/StudentsManagement', (req, res) => {
  res.render('StudentsManagement');
});

export default router;
