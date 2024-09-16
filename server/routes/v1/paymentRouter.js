import express from 'express';
import Stripe from 'stripe';
import { Reservation } from '../../models/reservationModel.js';

const stripe = new Stripe(process.env.Stripe_Private_API_KEY, { apiVersion: '2022-08-01' });
const router = express.Router();

const client_domain = 'https://rent-acar.vercel.app/';

router.post('/create-checkout', async (req, res) => {
    try {
        const { reservation } = req.body;

        // Ensure the reservation data is complete
        if (!reservation || !reservation.car || !reservation.totalRate) {
            return res.status(400).json({ success: false, message: "Incomplete reservation data" });
        }

        // Create a new Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${reservation.car.make} ${reservation.car.model}`,
                            images: reservation.car.images || [],  // Ensure images is an array
                        },
                        unit_amount: reservation.totalRate * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        // Update the reservation status to 'payed'
        const userReservation = await Reservation.findById(reservation._id);
        if (userReservation) {
            userReservation.status = 'payed';
            await userReservation.save();
        }

        // Respond with the session ID
        res.json({ success: true, id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal server error" });
    }
});

router.get('/session-status', async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        if (!sessionId) {
            return res.status(400).json({ success: false, message: "Session ID is required" });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.send({
            status: session?.status,
            customer_email: session?.customer_email,
            session
        });
    } catch (error) {
        console.error('Error retrieving session status:', error);
        res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal server error" });
    }
});

export default router;
