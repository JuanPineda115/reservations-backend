import { Request, Response } from 'express';
import pool from '../config/database';
import { Reservation } from '../types';

export const getAllReservations = async (req: Request, res: Response) => {
    try {
        const [reservations] = await pool.query(`
            SELECT r.*, u.name as clientName, rm.type as roomType, h.name as hotelName
            FROM reservation r
            JOIN user u ON r.clientId = u.idUser
            JOIN room rm ON r.roomId = rm.idRoom
            JOIN hotel h ON rm.hotelId = h.idHotel
        `);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservaciones', error });
    }
};

export const getReservationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [reservation] = await pool.query(`
            SELECT r.*, u.name as clientName, rm.type as roomType, h.name as hotelName
            FROM reservation r
            JOIN user u ON r.clientId = u.idUser
            JOIN room rm ON r.roomId = rm.idRoom
            JOIN hotel h ON rm.hotelId = h.idHotel
            WHERE r.idReservation = ?
        `, [id]);
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservación', error });
    }
};

export const getReservationsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const [reservations] = await pool.query(`
            SELECT r.*, rm.type as roomType, h.name as hotelName
            FROM reservation r
            JOIN room rm ON r.roomId = rm.idRoom
            JOIN hotel h ON rm.hotelId = h.idHotel
            WHERE r.clientId = ?
        `, [userId]);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservaciones del usuario', error });
    }
};

export const createReservation = async (req: Request, res: Response) => {
    try {
        const { roomId, clientId, startDate, endDate, noChildren, adultsQty, childrenQty }: Reservation = req.body;
        const [result] = await pool.query(
            'INSERT INTO reservation (roomId, clientId, startDate, endDate, noChildren, adultsQty, childrenQty) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [roomId, clientId, startDate, endDate, noChildren, adultsQty, childrenQty]
        );
        res.status(201).json({ message: 'Reservación creada exitosamente', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear reservación', error });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM reservation WHERE idReservation = ?', [id]);
        res.json({ message: 'Reservación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar reservación', error });
    }
}; 