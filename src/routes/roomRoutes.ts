import { Router } from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, getRoomsByHotel } from '../controllers/roomController';

const router = Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.get('/hotel/:hotelId', getRoomsByHotel);
router.post('/', createRoom);
router.delete('/:id', deleteRoom);

export default router; 