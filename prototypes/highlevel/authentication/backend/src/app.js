import express from 'express';
import router from './routes';

const app = express();
const port = 3000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Dan's Car Barn API listening on port ${port}`);
});
