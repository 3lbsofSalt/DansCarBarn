console.log('aoirsntoiarnsteionarseiotnioaersnteionarsteionaoirsnteioanrstoein');
import * as dotenv from 'dotenv';
dotenv.config({ debug: true });

import express from 'express';
import router from './routes';
import models from './models';

const app = express();
const port = 3001;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Dan's Car Barn API listening on port ${port}`);
});
