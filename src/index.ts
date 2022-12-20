import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes/router';

const app = express();
dotenv.config();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on: ${host}:${port}`);
});
