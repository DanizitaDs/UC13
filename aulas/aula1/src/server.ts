import express,  {Application, Request, Response} from "express"

const app: Application = express()
app.get('/',(req: Request,res: Response)=>{
    res.send('<h1>Ola mundo!</h1>')
})

app.get('nome/',(req: Request,res:Response)=>{
    res.send(' <h1>Ola fulano!</h1>')
})

app.listen(3000,()=>{
    console.log('Servidor rodando na porta 3000')
});