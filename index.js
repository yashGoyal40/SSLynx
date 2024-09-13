import express from 'express';
import sslRoutes from './routes/sslRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setTimeout(5000, () => {
    res.status(504).json({ error: 'Request timeout. Please try again.' });
  });
  next();
});

app.use(cors());

app.use('/api', sslRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
