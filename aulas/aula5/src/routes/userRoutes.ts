import { Router } from 'express';
import { UserController } from "../controller/userController";

const routes = Router();
const userController = new UserController();

routes.get('/users', userController.list);
routes.post('/users', userController.create);
routes.post('/users/nome/:nome', userController.findByName);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

export default routes;