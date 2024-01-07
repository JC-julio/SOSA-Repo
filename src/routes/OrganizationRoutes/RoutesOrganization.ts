import express from 'express';
import OrganizationController from '../../controllers/OrganizationManagement/OrganizationController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';
//all right

const router = express.Router();

router.post('/Organization', OrganizationController.Post);

router.get('/Organization/:idOrganization/:id', loginRequired, OrganizationController.GetOne);

router.get('/Organization/:idOrganization', loginRequired, OrganizationController.GetAll)

router.delete('/Organization/:idOrganization/:id', loginRequired, OrganizationController.Delete);

export default router;