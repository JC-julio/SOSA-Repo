import express from 'express';
import ExitsController from '../../controllers/ExitsManagement/ExitsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Exits/:idStudent/:idWorker', ExitsController.Post);

router.get('/Exits/:id', loginRequired, ExitsController.GetOne);

router.get('/Exits/:dateInit/:dateEnd', loginRequired, ExitsController.GetExits); 

router.get('/Exits', loginRequired, ExitsController.GetAll);

router.delete('/Exits', loginRequired, ExitsController.DeleteAll);

router.put('/Exits/:id', loginRequired, ExitsController.Update);

export default router;