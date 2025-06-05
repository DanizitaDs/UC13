import DishRouter from "./routes/dishRoutes";
import OrderRouter from "./routes/orderRoutes";
import UserRouter from "./routes/userRoutes";
import { AppDataSource } from "./config/data-source";
import express, { Application } from "express";
const app: Application = express();

app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    app.use(DishRouter);
    app.use(OrderRouter);
    app.use(UserRouter);
    app.listen(3000, () => {
      console.log("Servidor rodando em http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error(error);
  });
