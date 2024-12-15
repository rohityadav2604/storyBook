import express from 'express';

import cors from './config/cors.js';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'server is running' });
});

// Remove app.listen() for Vercel deployment

export default app;
