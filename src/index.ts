import express, { Request, Response } from 'express';
import { Sender } from './sender';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3333;
const sender = new Sender();

// app.get('/status', (req: Request, res: Response) => {});

app.post('/send', async (req: Request, res: Response) => {
  const { receiver, message } = req.body;

  const defaultSend = {
    number: receiver,
    message,
  };

  try {
    const sentMessage = await sender.sendMessage(defaultSend);
    return res.status(200).json(sentMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error });
  }
});

app.listen(port, () => console.log(`App listen on port: ${port}`));
