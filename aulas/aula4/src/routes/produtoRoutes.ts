import { Router } from 'express';
import { ProdutoController } from "../controllers/produtoController";

const routes = Router();
const produtoController = new ProdutoController();

routes.get('/produto', produtoController.list);
routes.post('/produto', produtoController.create);
routes.post('/produto/nome/:nome', produtoController.findByName);
routes.get('/produto/:id', produtoController.show);
routes.put('/produto/:id', produtoController.update);
routes.delete('/produto/:id', produtoController.delete);

export default routes;