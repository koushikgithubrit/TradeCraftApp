import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courses.js';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/payment.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// No special middleware needed since payments are disabled

// Server is running without database - using localStorage on frontend

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
