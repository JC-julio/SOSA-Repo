import express from 'express';
import ExitsController from '../../controllers/ExitsManagement/ExitsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';

//ALL TESTED

const router = express.Router();

router.post('/Exits/:idOrganization', loginRequired ,  ExitsController.Post);

router.get('/Exits/:idOrganization/:id', loginRequired,  ExitsController.GetOne);

router.get('/Exits/:idOrganization/:dateInit/:dateEnd', loginRequired,  ExitsController.GetExits); 

router.get('/Exits/:idOrganization', loginRequired,  ExitsController.GetAll);

// router.delete('/Exits/Exits', loginRequired,  ExitsController.DeleteAll);

router.put('/Exits/:idOrganization/:id', loginRequired,  ExitsController.Update);

export default router;