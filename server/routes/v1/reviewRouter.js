import express from 'express'
import { createReview, deleteReview, getReviews, updateReview } from '../../controllers/reviewController.js'
import { authUser } from '../../middlewares/authUser.js'
import { authAdmin } from '../../middlewares/authAdmin.js'

const router = express.Router()


// Create a review for a specific car
router.post('/create/:carId', authUser, createReview);

// Get all reviews for a specific car
router.get('/car/:carId', getReviews);

// Update a specific review
router.put('/review/:reviewId', authUser, updateReview);

// Delete a specific review (by user or admin)
router.delete('/review/:reviewId', authUser, deleteReview, authAdmin);
// router.get('/review/user/:id',getUserReviews )

export default router