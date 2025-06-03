import { AppDataSource } from "./config/data-source";
import Express, { Application } from "express";

const app: Application = Express();

app.use(Express.json());

AppDataSource.initialize().then(() =>{
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    })
}).catch((error) =>{
    console.error(error)
})