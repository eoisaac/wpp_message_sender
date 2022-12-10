import express from 'express';
import { router } from './routes/router';

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
