import express from "express"
import { approveReservation, cancelReservation, createReservation, getAllReservations, getDealerCarReservation, getPendingReservations, getUserReservations, rejectReservation, updateReservation } from "../../controllers/reservationController.js"
import { authUser } from "../../middlewares/authUser.js";
import { authDealerOrAdmin } from "../../middlewares/authDealerORAdmin.js";
import { authAdmin } from "../../middlewares/authAdmin.js";
import { authDealer } from "../../middlewares/authDealer.js";

const router = express.Router()

// User routes
router.post('/create', authUser, createReservation);
router.get('/user/reservations', authUser, getUserReservations);
router.put('/:id', authUser, updateReservation);
router.delete('/reservation/:id', authUser, cancelReservation);

// Dealer/Admin routes
router.put('/approve/:id', authDealer, approveReservation);
router.put('/reject/:id', authDealer, rejectReservation);
router.get('/reservations/pending', authDealerOrAdmin, getPendingReservations);
router.get('/reservations', authAdmin, getAllReservations);

router.get('/dealer-reservations', authDealer, getDealerCarReservation);





export default router