import { Router } from 'express';
import { createHotel, getAllHotels } from '../controllers/hotelController';

const router = Router();

router.get('/', getAllHotels);
router.post('/', createHotel);

export default router; 