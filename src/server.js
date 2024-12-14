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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});