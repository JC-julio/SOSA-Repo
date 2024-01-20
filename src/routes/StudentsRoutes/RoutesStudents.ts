import express from 'express';
import StudentsController from '../../controllers/Students/StudentsController';
import { loginRequired } from '../../middlewares/middlewareDeLogin';
//all right
const router = express.Router();

router.post('/Student/:idOrganization', loginRequired, StudentsController.Post);

router.get('/Student/:idOrganization/:id', loginRequired, StudentsController.GetOne);

router.get("/Student/:idOrganization", loginRequired, StudentsController.GetAll);

router.get('/StudentGetByRegistration/:registration/:idOrganization', loginRequired, StudentsController.GetByRegistration)

router.get('/StudentGet/:idOrganization/:className', loginRequired, StudentsController.GetByClassName);

router.delete('/Student/:idOrganization/:id', loginRequired, StudentsController.Delete);

router.put('/Student/:idOrganization/:id', loginRequired, StudentsController.Update);

export default router;