import { Request, Response } from "express";
import { produto, produtos } from "../models/produto";

let id: number = 0;

// Criar um novo usuário
export const criarProduto = (req: Request, res: Response) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    res.status(400).json({ mensagem: "Todos os campos são obrigatorios!" });
    return;
  }

  id += 1;

  const novoproduto = new produto(id, nome, preco);
  produtos.push(novoproduto);
  res
    .status(201)
    .json({ mensagem: "produto criado com sucesso!", produto: novoproduto });
  return;
};

// Listar todos os usuários
export const listarprodutos = (req: Request, res: Response) => {
  res.status(200).json(produtos);
};

// Buscar um usuário por ID
export const buscarprodutoPorId = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const produto = produtos.find((u) => u.id === id);
  if (!produto) {
    res.status(404).json({ mensagem: "produto não encontrado" });
    return;
  }

  res.status(200).json(produto);
  return;
};

// Atualizar um usuário
export const atualizarproduto = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;

  if (!id) {
    res.status(400).json({ mensagem: "ID é obrigatorio" });
    return;
  }

  if (!nome && !preco) {
    res
      .status(400)
      .json({ mensagem: "preencha ao menos um campo (preco/nome)" });
      return;
  }

  const produto = produtos.find((u) => u.id === id);

  if (!produto) {
    res.status(404).json({ mensagem: "produto não encontrado" });
    return;
  }

  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;

  res
    .status(200)
    .json({ mensagem: "produto atualizado com sucesso!", produto });
};

// Deletar um usuário
export const deletarproduto = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json({ mensagem: "ID é obrigatorio" });
    return;
  }
  
  const index = produtos.findIndex((u) => u.id === id);

  if (index === -1){
    res.status(404).json({ mensagem: "produto não encontrado" });
    return;
  }

  produtos.splice(index, 1);
  res.status(200).json({ mensagem: "produto deletado com sucesso!" });
};
