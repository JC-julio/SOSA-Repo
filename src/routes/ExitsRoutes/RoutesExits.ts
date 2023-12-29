import express from 'express';
import ExitsController from '../../controllers/ExitsManagement/ExitsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/ExitsManagement', ExitsController.Post);

router.get('/ExitsManagement/:id', loginRequired, ExitsController.GetOne);

router.get('/ExitsManagement/:dateInit/:dateEnd', loginRequired, ExitsController.GetExits); 

router.get('/ExitsManagement', loginRequired, ExitsController.GetAll);

router.delete('/ExitsManagement', loginRequired, ExitsController.DeleteAll);

router.put('/ExitsManagement/:id', loginRequired, ExitsController.Update);

export default router;