import { Request, Response, Router } from 'express';
import { SendTextMessage } from '../app/useCases/sendTextMessage';

export const router = Router();

router.post('/messages/send', async (req: Request, res: Response) => {
  const reqBody = req.body;

  const result = await SendTextMessage.execute({
    receiver: reqBody.receiver,
    content: reqBody.message,
  });

  res.status(200).json(result);
});

router.get('/code', async (req: Request, res: Response) => {
  const result = await SendTextMessage.qrCode();

  res.status(200).json(result);
});

router.get('/status', async (req: Request, res: Response) => {
  const result = await SendTextMessage.status();

  res.status(200).json(result);
});
