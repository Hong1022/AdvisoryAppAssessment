import express from 'express';
import {
  createListing,
  deleteListing,
  getUserListings,
  updateListing,
  getAllListings,
} from '../controllers/listings.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/get', AuthMiddleware, getUserListings);
router.get('/get-all', AuthMiddleware, getAllListings);
router.put('/create', AuthMiddleware, createListing);
router.post('/update', AuthMiddleware, updateListing);
router.delete('/delete', AuthMiddleware, deleteListing);

export default router;
