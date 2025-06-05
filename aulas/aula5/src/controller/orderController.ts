import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import { OrderItem } from "../models/OrderItem";
import { Order } from "../models/Order";

const orderRepository = AppDataSource.getRepository(Order);

export class OrderController {
  async list(req: Request, res: Response) {
    const order = orderRepository.find();
    res.json(order);
    return;
  }

  async create(req: Request, res: Response) {
    const { createdAt, status } = req.body;
    const order = orderRepository.create({ createdAt, status });
    res.status(201).json(order);
    return;
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const order = await orderRepository.findOneBy({ id: Number(id) });

    if (!order) {
      res.status(404).json({ message: "Order não encontrado" });
      return;
    }

    res.json(order);
    return;
  }

  // Atualizar Order
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { createdAt, status } = req.body;

    const order = await orderRepository.findOneBy({ id: Number(id) });

    if (!order) {
      res.status(404).json({ message: "Order não encontrado" });
      return;
    }

    order.createdAt = createdAt;
    order.status = status;

    await orderRepository.save(order);

    res.json(order);
    return;
  }

  // Deletar Order
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const order = await orderRepository.findOneBy({ id: Number(id) });

    if (!order) {
      res.status(404).json({ menssage: "Order não encontrado" });
      return;
    }

    await orderRepository.remove(order);
    res.status(204).send();
    return;
  }
}
