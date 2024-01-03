import express from 'express';
import ExitsController from '../../controllers/OrganizationManagement/OrganizationController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';


const router = express.Router();

router.post('/Exits/:idStudent/:idWorker', );

router.get('/Exits/:id', loginRequired, );

router.get('/Exits', loginRequired, ExitsController.GetAll);

router.delete('/Exits', loginRequired, ExitsController.DeleteAll);


export default router;