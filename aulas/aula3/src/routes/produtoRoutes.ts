import { Router } from "express";
import { criarProduto, listarprodutos, buscarprodutoPorId, atualizarproduto, deletarproduto } from "../controllers/produtoController";

const router = Router();

router.post("/produtos", criarProduto);
router.get("/produtos", listarprodutos);
router.get("/produtos/:id", buscarprodutoPorId);
router.put("/produtos/:id", atualizarproduto);
router.delete("/produtos/:id", deletarproduto);

export default router;