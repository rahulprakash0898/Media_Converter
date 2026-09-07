import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';
import mediaRoutes from './routes/media.route.js';
import { connectDB } from './config/index.js';

dotenv.config();


const app = express();


app.use(express.json());
app.use(cors()); 


connectDB();


['uploads/original', 'uploads/converted'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});


// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Media Converter API Service is running'
  });
});

app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
