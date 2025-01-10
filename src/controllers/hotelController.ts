import { Request, Response } from 'express';
import pool from '../config/database';
import { Hotel } from '../types';

export const getAllHotels = async (req: Request, res: Response) => {
    try {
        const [hotels] = await pool.query('SELECT * FROM hotel');
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener hoteles', error });
    }
};

export const createHotel = async (req: Request, res: Response) => {
    try {
        const { name, description }: Hotel = req.body;
        const [result] = await pool.query(
            'INSERT INTO hotel (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.status(201).json({ message: 'Hotel creado exitosamente', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear hotel', error });
    }
};