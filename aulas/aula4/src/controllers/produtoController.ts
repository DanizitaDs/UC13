import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Produto } from '../models/produtos';

const ProdutoRepository = AppDataSource.getRepository(Produto);

export class ProdutoController {
    // Listar todos os Produtos
    async list(req: Request, res: Response) {
        const Produtos = await ProdutoRepository.find();
         res.json(Produtos);
         return;
    }

    // Criar novo Produto
    async create(req: Request, res: Response) {
        const { nome, descricao, preco } = req.body;

        const Produto = ProdutoRepository.create({ nome, descricao, preco });
        await ProdutoRepository.save(Produto);

        res.status(201).json(Produto);
        return;
    }

    // Buscar Produto por ID
    async show(req: Request, res: Response) {
        const { nome } = req.params;
        const Produto = await ProdutoRepository.findOneBy({ nome: String(nome) });
        if (!Produto) {
             res.status(404).json({ message: 'Produto não encontrado' });
             return;
        }
       res.json(Produto)
       return;
    }

async findByName(req: Request,res: Response){
    const {nome} = req.params;
    const produto = await ProdutoRepository.findBy({nome});
    if(!produto){
        res.status(404).json({message: 'Produto não encontrado'});
        return;
        }
    res.json(produto);
    return;
}

    // Atualizar Produto
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, descricao, preco } = req.body;

        const Produto = await ProdutoRepository.findOneBy({ id: Number(id) });

        if (!Produto) {
             res.status(404).json({ message: 'Produto não encontrado' });
             return;
        }

        Produto.nome = nome;
        Produto.descricao = descricao;
        Produto.preco = preco;

        await ProdutoRepository.save(Produto);
         res.json(Produto);
         return;
    }

    // Deletar Produto
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const Produto = await ProdutoRepository.findOneBy({ id: Number(id) });

        if (!Produto) {
             res.status(404).json({ message: 'Produto não encontrado' });
             return;
        }

        await ProdutoRepository.remove(Produto);

         res.status(204).send();
         return;
    }
}