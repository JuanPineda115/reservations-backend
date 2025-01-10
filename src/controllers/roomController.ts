import { Request, Response } from 'express';
import pool from '../config/database';
import { Room } from '../types';

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const [rooms] = await pool.query('SELECT * FROM room');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener habitaciones', error });
    }
};

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [room] = await pool.query('SELECT * FROM room WHERE idRoom = ?', [id]);
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener habitación', error });
    }
};

export const getRoomsByHotel = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;
        const [rooms] = await pool.query('SELECT * FROM room WHERE hotelId = ?', [hotelId]);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener habitaciones del hotel', error });
    }
};

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { type, noChildren, adultsCapacity, childrenCapacity, hotelId, memberPrice, normalPrice }: Room = req.body;
        const [result] = await pool.query(
            'INSERT INTO room (type, noChildren, adultsCapacity, childrenCapacity, hotelId, memberPrice, normalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, noChildren, adultsCapacity, childrenCapacity, hotelId, memberPrice, normalPrice]
        );
        res.status(201).json({ message: 'Habitación creada exitosamente', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear habitación', error });
    }
};

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM room WHERE idRoom = ?', [id]);
        res.json({ message: 'Habitación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar habitación', error });
    }
}; 