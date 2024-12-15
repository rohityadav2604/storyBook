import express from 'express';

import cors from './config/cors.js';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use('/api', router); // Example of routes under "/api"

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Remove app.listen() for Vercel deployment

// export default app;