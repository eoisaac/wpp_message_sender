import { Message } from '../models/message';
import { Sender } from '../models/sender';

interface SendTextMessageRequest {
  receiver: string
  content: string
}

type SendTextMessageResponse = Message;

const sender = new Sender({ sessionName: 'wpp_message_sender' });

export class SendTextMessage {
  static async execute({ receiver, content }: SendTextMessageRequest):
  Promise<SendTextMessageResponse> {
    const client = sender.getClient;

    client.sendText(`${receiver}`, content);

    const message = new Message({
      receiver,
      content,
    });

    return message;
  }
}
