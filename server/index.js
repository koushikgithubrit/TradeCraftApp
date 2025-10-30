import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import courseRoutes from './routes/courses.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import { connectToDatabase } from './mongo.js';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: './.env' });

const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Attempt MongoDB connection (optional). Frontend has fallback local auth.
connectToDatabase()
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => console.warn('⚠️ MongoDB connection failed, falling back to local auth only:', err?.message || err));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Server is running without database - using localStorage on frontend

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 