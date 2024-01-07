import express from 'express';
import ExitsController from '../../controllers/ExitsManagement/ExitsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Exits/:idOrganization/:idStudent/:idWorker', loginRequired ,  ExitsController.Post);

router.get('/Organization/:idOrganization/Exits/:id', loginRequired,  ExitsController.GetOne);

router.get('/Organization/:idOrganization/Exits/:dateInit/:dateEnd', loginRequired,  ExitsController.GetExits); 

router.get('/Organization/:idOrganization/Exits', loginRequired,  ExitsController.GetAll);

router.delete('/Organization/Exits', loginRequired,  ExitsController.DeleteAll);

router.put('/Organization/:idOrganization/Exits/:id', loginRequired,  ExitsController.Update);

export default router;