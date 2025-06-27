import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  getDestinations,
  getTransportsByDestination,
  getHotelsByDestination,
  getHotelById,
  createBooking
} from '../controllers/travel.controller.js';

const router = express.Router();

router.get('/destinations', getDestinations);
router.get('/destinations/:id/transports', getTransportsByDestination);
router.get('/destinations/:id/hotels', getHotelsByDestination);

router.get('/hotels/:id', getHotelById);
router.post('/bookings', verifyToken ,createBooking);


export default router;
