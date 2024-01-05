import express from 'express';
import ExitsController from '../../controllers/ExitsManagement/ExitsController';
import { organizationRequired } from 'src/middlewares/middlewareDeOrganization';

//ALL TESTED

const router = express.Router();

router.post('/Organization/:idOrganization/Exits/:idStudent/:idWorker', organizationRequired, ExitsController.Post);

router.get('/Organization/:idOrganization/Exits/:id', organizationRequired, ExitsController.GetOne);

router.get('/Organization/:idOrganization/Exits/:dateInit/:dateEnd', organizationRequired, ExitsController.GetExits); 

router.get('/Organization/:idOrganization/Exits', organizationRequired, ExitsController.GetAll);

router.delete('/Organization/:idOrganization/Exits', organizationRequired, ExitsController.DeleteAll);

router.put('/Organization/:idOrganization/Exits/:id', organizationRequired, ExitsController.Update);

export default router;