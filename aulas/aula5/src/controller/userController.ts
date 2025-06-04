import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export class UserController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const users = await userRepository.find();
        res.json(users);
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { name, email, password, role, phone } = req.body;

        const user = new User(name, email, password, role, phone);
        if (phone) user.phone = phone;

        await userRepository.save(user);
        res.status(201).json(user);
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(user);
    }

    // Buscar usuários por nome (opcional)
    async findByName(req: Request, res: Response) {
        const { name } = req.params;

        const users = await userRepository
            .createQueryBuilder('user')
            .where('user._name ILIKE :name', { name: `%${name}%` })
            .getMany();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado com esse nome' });
        }

        res.json(users);
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password, role, phone } = req.body;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (role) user.role = role;
        if (phone) user.phone = phone;

        await userRepository.save(user);
        res.json(user);
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await userRepository.remove(user);
        res.status(204).send();
    }
}
