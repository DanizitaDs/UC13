import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Dish } from '../models/Dish';

const dishRepository = AppDataSource.getRepository(Dish);

export class DishController {
    // Listar todos os Dishs
    async list(req: Request, res: Response) {
        const Dishs = await dishRepository.find();
         res.json(Dishs);
         return;
    }

    // Criar novo Dish
    async create(req: Request, res: Response) {
        const { name, description, price, available } = req.body;
    
        const dish = new Dish(name, description, price, available);
        await dishRepository.save(dish);
    
        res.status(201).json(dish);
        return
    }
    

    // Buscar Dish por ID
    async show(req: Request, res: Response) {
        const dish = await dishRepository
        .createQueryBuilder("dish")
        .where("dish._name = :name", { name })
        .getOne();
    }
    

    // Atualizar Dish
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, available } = req.body;
    
        const dish = await dishRepository.findOneBy({ id: Number(id) });
    
        if (!dish) {
            
            res.status(404).json({ message: 'Dish não encontrado' });
            return 
        }
    
        dish.name = name;
        dish.description = description;
        dish.price = price;
        dish.available = available;
    
        await dishRepository.save(dish);
        res.json(dish);
    }
    

    // Deletar Dish
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const Dish = await dishRepository.findOneBy({ id: Number(id) });

        if (!Dish) {
             res.status(404).json({ message: 'Dish não encontrado' });
             return;
        }

        await dishRepository.remove(Dish);

         res.status(204).send();
         return;
    }
}