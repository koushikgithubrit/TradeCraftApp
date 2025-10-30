import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courses.js';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/payment.js';
import authRoutes from './routes/auth.js';
import { connectToDatabase } from './mongo.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Attempt MongoDB connection (optional). Frontend has fallback local auth.
connectToDatabase()
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => console.warn('⚠️ MongoDB connection failed, falling back to local auth only:', err?.message || err));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
