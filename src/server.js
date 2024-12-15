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
  res.send('server is running');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
