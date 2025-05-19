import express, { Application } from "express";
import usuarioRoutes from "./routes/usuarioRoutes";

const app: Application = express();
app.use(express.json());
app.use("/api", usuarioRoutes);

app.listen(3000, () =>{
    console.log("🚀 Servidor rodando em http://localhost:3000")
})