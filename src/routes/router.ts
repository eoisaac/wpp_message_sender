import { Request, Response, Router } from 'express';
import { DefaultException } from '../app/models/defaultException';
import { SendTextMessage } from '../app/useCases/sendTextMessage';

export const router = Router();

router.post('/messages/send', async (req: Request, res: Response) => {
  try {
    const { receiver, message } = req.body;

    if (!receiver || !message) {
      throw new DefaultException({
        code: 400,
        message: 'You must add the receiver and the message!',
      });
    }

    const result = await SendTextMessage.execute({
      receiver,
      content: message,
    });

    return res.status(200).json(result);
  } catch (exception) {
    if (exception instanceof DefaultException) {
      res.status(exception.code).json(exception.error);
    }
  }
});

router.get('/health', async (req: Request, res: Response) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    res.send(healthCheck);
  } catch (exception) {
    if (exception instanceof Error) {
      healthCheck.message = exception.message;
      res.status(503).send();
    }
  }
});
