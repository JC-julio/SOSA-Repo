import express from 'express';
import OrganizationController from '../../controllers/OrganizationManagement/OrganizationController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';


const router = express.Router();

router.post('/Organization', OrganizationController.Post);

router.get('/Organization/:id', loginRequired, OrganizationController.GetOne);

router.get('/Organization', loginRequired, OrganizationController.GetAll)

router.delete('/Organization/:id', loginRequired, OrganizationController.Delete);

export default router;