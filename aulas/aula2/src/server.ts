import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

// 🔹 Rota GET (Eu) Atividade 1
app.get('/sobre', (req: Request, res: Response) => {
  res.status(200).json({ nome: 'Danielle', idade: '17 anos', descricao: 'Sou a danielle, tenho 17 anos e faaço tecnico aqui no senac.' });
});

// 🔹 Rota GET (Buscar dados)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ mensagem: 'Lista de usuários' });
  });

// 🔹 Rota POST (Criar novo usuário)
app.post('/sobre', (req: Request, res: Response) => {
  const { nome, idade, descricao } = req.body;
  if (!nome && !idade && !descricao) {
    res.status(400).json({ mensagem: 'Nome é obrigatório!' });
  }
  res.status(201).json({ mensagem: `Usuário ${nome}, ${idade},${descricao} criado com sucesso!` });
});

// 🔹 Rota POST (Criar novo usuário)
app.post('/comentarios', (req: Request, res: Response) => {
  const { descricao } = req.body;
  if (!descricao) {
    res.status(400).json({ descricao: 'Campo vazio!' });
    return;
  }
  res.status(201).json({ descricao: `comentario recebido` });
  return;
});

app.delete('/comentarios/:id', (req:Request,res: Response)=>{
const id = req.params.id; 
res.status(204).json({ mensagem: `Comentario deletado com sucesso!` });
})

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));