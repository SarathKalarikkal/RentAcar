import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.Stripe_Private_API_KEY);
const router = express.Router();

const client_domain = 'http://localhost:5173'

router.post('/create-checkout', async (req, res) => {
    try {
        const { reservation } = req.body;

        // Create a new Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${reservation.car.make} ${reservation.car.model}`,
                            images: reservation.car.images,
                        },
                        unit_amount: reservation.totalRate * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });
        reservation.status = 'payed'
        

        console.log(reservation)
        // Respond with the session ID
        res.json({success:true, id: session.id });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
});


router.get('/session-status', async(req, res, next)=>{
  try {
    
   const sessionId = req.query.session_id;
   const session = await stripe.checkout.session.retrive(sessionId)

   res.send({
    status : session?.status,
    customer_email :session?.customer_detail?.email,
    session
   });

  } catch (error) {
    res.status(error?.statusCode || 500).json(error.message || "internal server error")
  }
})

export default router;
