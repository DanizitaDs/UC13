import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Order } from '../models/Order';

const orderRepository = AppDataSource.getRepository(Order);

export class OrderController {
    // Listar todos os pedidos
    async list(req: Request, res: Response) {
        const orders = await orderRepository.find({ relations: ['items', 'user'] });
        res.json(orders);
    }

    // Criar novo pedido
    async create(req: Request, res: Response) {
        const { status } = req.body;

        const order = new Order(status); // use o construtor da classe
        await orderRepository.save(order);

        res.status(201).json(order);
    }

    // Buscar pedido por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const order = await orderRepository.findOne({
            where: { id: Number(id) },
            relations: ['items', 'user']
        });

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.json(order);
    }

    // Buscar pedidos por status (opcional)
    async findByStatus(req: Request, res: Response) {
        const { status } = req.params;
        const orders = await orderRepository
            .createQueryBuilder('order')
            .where('order._status = :status', { status })
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('order.user', 'user')
            .getMany();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Nenhum pedido encontrado com esse status' });
        }

        res.json(orders);
    }

    // Atualizar pedido
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        const order = await orderRepository.findOneBy({ id: Number(id) });

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        order.status = status; // usa o setter para alterar o campo privado
        await orderRepository.save(order);

        res.json(order);
    }

    // Deletar pedido
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const order = await orderRepository.findOneBy({ id: Number(id) });

        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        await orderRepository.remove(order);
        res.status(204).send();
    }
}
