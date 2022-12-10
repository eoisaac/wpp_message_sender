import { Request, Response, Router } from 'express';
import { SendTextMessage } from '../app/useCases/sendTextMessage';

export const router = Router();

router.post('/messages/send', (req: Request, res: Response) => {
  const test = {
    receiver: '5531971546159@c.us',
    content: 'string',
  };

  const result = SendTextMessage.execute(test);
  res.status(200).json(result);
});
