const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST /api/payments/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body;
    
    // Маппинг frontend price_id → Stripe price ID
    const priceMap = {
      'price_1': process.env.STRIPE_PRICE_1,
      'price_2': process.env.STRIPE_PRICE_2,
      'price_3': process.env.STRIPE_PRICE_3,
      'price_4': process.env.STRIPE_PRICE_4
    };

    const stripePriceId = priceMap[priceId];
    if (!stripePriceId) {
      return res.status(400).json({ error: 'Некорректный тариф' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: stripePriceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Ошибка платёжного шлюза' });
  }
});

module.exports = router;
