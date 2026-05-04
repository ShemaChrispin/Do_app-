import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Corrected paths to point to the backend/src directory
import authRoutes from '../backend/src/routes/authRoutes.js';
import taskRoutes from '../backend/src/routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running on Vercel!' });
});

export default app;
