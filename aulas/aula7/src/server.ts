import userRouter from "./routes/UserRoutes";
import express, {Application} from "express";
import { AppDataSource } from "./database/data-source";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

AppDataSource.initialize().then(() => {

    app.use(userRouter)

    app.listen(3000, ()=>{
        console.log("Servidor rodando em http://localhost:3000");
    })
}).catch((error) =>{
    console.error(error);
})