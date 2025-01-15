import { Router } from 'express';
import { createReservation, deleteReservation, getAllReservations } from '../controllers/reservationController';

const router = Router();

router.get('/', getAllReservations);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

export default router; 