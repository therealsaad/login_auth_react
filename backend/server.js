import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('📥', req.path, req.body);
  }
  next();  
});


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MERN Auth API ✅' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
});
