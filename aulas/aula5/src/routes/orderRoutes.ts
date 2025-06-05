import { Router } from "express";
import { OrderController } from "../controller/orderController";
const router: Router = Router();
const con = new OrderController();

router.get("/order", con.list);
router.post("/order", con.create);
router.delete("/order/:id", con.delete);
router.get("/order/:id", con.show);
router.put("/order/:id", con.update);

export default router;
