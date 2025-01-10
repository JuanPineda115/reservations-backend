import { Request, Response } from 'express';
import pool from '../config/database';
import { User } from '../types';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const [users] = await pool.query('SELECT * FROM user');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, mail, phone, member }: User = req.body;
        const [result] = await pool.query(
            'INSERT INTO user (name, mail, phone, member) VALUES (?, ?, ?, ?)',
            [name, mail, phone, member]
        );
        res.status(201).json({ message: 'Usuario creado exitosamente', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM user WHERE idUser = ?', [id]);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [user] = await pool.query('SELECT * FROM user WHERE idUser = ?', [id]);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
}; 