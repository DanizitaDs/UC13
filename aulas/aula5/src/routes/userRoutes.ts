import { Router } from "express";
import { UserController } from "../controller/userController";
const router: Router = Router();
const con = new UserController();

router.get("/users", con.list);
router.post("/users", con.create);
router.delete("/users/:id", con.delete);
router.get("/users/:id", con.show);
router.put("/users/:id", con.update);

export default router;
