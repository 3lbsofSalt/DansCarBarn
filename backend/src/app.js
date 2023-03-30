import express from 'express';
import router from './routes';

import cors from 'cors';
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

const app = express();
const port = 3001;
app.use(cors(corsOptions));

app.use(express.json({ extended: true, limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Dan's Car Barn API listening on port ${port}`);
});
