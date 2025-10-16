import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Create payment intent (deprecated - courses are now free)
router.post('/create-payment-intent', async (req: Request, res: Response) => {
  try {
    // Since courses are now free, just return a success response
    res.status(400).json({ error: 'Courses are now free. No payment required.' });
  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle successful payments (deprecated)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  try {
    // Since courses are now free, webhooks are not needed
    res.json({ received: true, message: 'Courses are now free' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user's purchased courses (now returns enrolled courses from localStorage)
router.get('/purchased-courses', async (req: Request, res: Response) => {
  try {
    // Since courses are now free and we use localStorage, return empty array
    // The frontend handles enrolled courses via localStorage
    res.json([]);
  } catch (error: any) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router; 