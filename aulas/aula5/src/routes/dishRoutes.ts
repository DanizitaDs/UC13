import { Router } from "express";
import { DishController } from "../controller/dishConstroller";
const router: Router = Router();
const con = new DishController();

router.get("/dish", con.list);
router.post("/dish", con.create);
router.delete("/dish/:id", con.delete);
router.get("/dish/:id", con.show);
router.put("/dish/:id", con.update);

export default router;
