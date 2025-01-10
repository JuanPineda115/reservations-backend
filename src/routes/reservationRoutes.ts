import { Router } from 'express';
import { createReservation, deleteReservation, getAllReservations, getReservationById, getReservationsByUser } from '../controllers/reservationController';

const router = Router();

router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.get('/user/:userId', getReservationsByUser);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

export default router; 