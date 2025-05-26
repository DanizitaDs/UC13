import { Router } from 'express';
import { UserController } from "../controllers/userController";

const routes = Router();
const userController = new UserController();

routes.get('/users', userController.list);
routes.post('/users', userController.create);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

export default routes;