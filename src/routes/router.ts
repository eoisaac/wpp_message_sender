import { Request, Response, Router } from 'express';
import { DefaultException } from '../app/models/defaultException';
import { SendTextMessage } from '../app/useCases/sendTextMessage';

export const router = Router();

router.post('/messages/send', async (req: Request, res: Response) => {
  try {
    const messageList = req.body;

    if (!messageList || messageList.length === 0) {
      throw new DefaultException({
        code: 400,
        message: 'You must provide at least one message to send!',
      });
    }

    const results = [];
    for (const message of messageList) {
      const { receiver, content } = message;

      if (!receiver || !content) {
        throw new DefaultException({
          code: 400,
          message: 'You must add the receiver and the message for each item!',
        });
      }

      const result = await SendTextMessage.execute({ receiver, content });
      results.push(result);
    }

    return res.status(200).json(results);
  } catch (exception) {
    if (exception instanceof DefaultException) {
      res.status(exception.code).json(exception.error);
    } else {
      res.status(500).json({ message: 'An unexpected error occurred!' });
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
