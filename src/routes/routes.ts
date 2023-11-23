// Importando os módulos necessários
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ info: 'sim' });
  // res.render('home', variavel);
});

router.get('/VisualizaGuarita', (req, res) => {
  res.render('VisualizaGuarita');
});

router.get('/AdminManagement', (req, res) => {
  res.render('AdminManagement');
});

router.get('/StudentsManagement', (req, res) => {
  res.render('StudentsManagement');
});

export default router;
