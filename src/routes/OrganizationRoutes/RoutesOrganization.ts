import express from 'express';
import OrganizationController from '../../controllers/OrganizationManagement/OrganizationController';
import { organizationRequired } from 'src/middlewares/middlewareDeOrganization';

const router = express.Router();

router.post('/Organization', OrganizationController.Post);

router.get('/Organization/:idOrganization/:id', organizationRequired, OrganizationController.GetOne);

router.get('/Organization/:idOrganization', organizationRequired, OrganizationController.GetAll)

router.delete('/Organization/:idOrganization/:id', organizationRequired, OrganizationController.Delete);

export default router;